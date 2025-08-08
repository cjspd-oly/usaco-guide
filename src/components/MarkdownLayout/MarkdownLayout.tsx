import { graphql, useStaticQuery } from 'gatsby';
import React, { useState, useEffect, useContext } from "react";
import { moduleIDToSectionMap, moduleIDToURLMap } from '../../../content/ordering';
import ConfettiContext from '../../context/ConfettiContext';
import { ContactUsSlideoverProvider } from '../../context/ContactUsSlideoverContext';
import MarkdownLayoutContext from '../../context/MarkdownLayoutContext';
import { ProblemSolutionContext } from '../../context/ProblemSolutionContext';
import { ProblemSuggestionModalProvider } from '../../context/ProblemSuggestionModalContext';
import { useUserLangSetting } from '../../context/UserDataContext/properties/simpleProperties';
import { useSetProgressOnModule, useUserProgressOnModules} from '../../context/UserDataContext/properties/userProgress';
import { ModuleInfo } from '../../models/module';
import { SolutionInfo } from '../../models/solution';
import ForumCTA from '../ForumCTA';
import DesktopSidebar from "./DesktopSidebar";
import MobileAppBar from './MobileAppBar';
import MobileSideNav from './MobileSideNav';
import ModuleHeaders from './ModuleHeaders/ModuleHeaders';
import ModuleProgressUpdateBanner from './ModuleProgressUpdateBanner';
import NavBar from './NavBar';
import NotSignedInWarning from './NotSignedInWarning';
import TableOfContentsBlock from './TableOfContents/TableOfContentsBlock';
import TableOfContentsSidebar from './TableOfContents/TableOfContentsSidebar';
import PinButton from "./SidebarNav/PinButton";


const ContentContainer = ({ children, tableOfContents }) => (
  <main
    className="relative overflow-x-hidden pt-6 focus:outline-hidden lg:pt-2"
    tabIndex={0}
  >
    <div className="mx-auto">
      <div className="flex justify-center">
        {tableOfContents.length > 1 && (
          <div className="order-3 mt-48 mr-6 ml-6 hidden w-64 shrink-0 2xl:block">
            <TableOfContentsSidebar tableOfContents={tableOfContents} />
          </div>
        )}
        <div className="order-2 w-0 max-w-4xl min-w-0 flex-1 overflow-x-auto px-4 sm:px-6 lg:px-8 lg:pl-[5rem]">
          <div className="hidden lg:block">
            <NavBar />
            <div className="h-8" />
          </div>
          {children}
          <div className="pt-4 pb-6">
            <NavBar alignNavButtonsRight={false} />
          </div>
        </div>
      </div>
    </div>
  </main>
);

export default function MarkdownLayout({
  markdownData,
  children,
}: {
  markdownData: ModuleInfo | SolutionInfo;
  children: React.ReactNode;
}) {
  const userProgressOnModules = useUserProgressOnModules();
  const setModuleProgress = useSetProgressOnModule();
  const lang = useUserLangSetting();

  // Hydration-safe sidebar pinned state (persisted)
  const [sidebarPinned, setSidebarPinned] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("usacoguide:sidebar:pinned");
      if (stored !== null) setSidebarPinned(stored === "true");
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "usacoguide:sidebar:pinned",
        sidebarPinned ? "true" : "false"
      );
    }
  }, [sidebarPinned]);

  // Sidebar hover state
  const [sidebarHovering, setSidebarHovering] = useState(false);

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const moduleProgress =
    (userProgressOnModules && userProgressOnModules[markdownData.id]) ||
    'Not Started';

  const tableOfContents =
    lang in markdownData.toc ? markdownData.toc[lang] : markdownData.toc['cpp'];

  const data = useStaticQuery(graphql`
    query {
      allXdm(filter: { fileAbsolutePath: { regex: "/content/" } }) {
        nodes {
          frontmatter {
            title
            id
          }
        }
      }
    }
  `);
  const moduleLinks = React.useMemo(() => {
    return data.allXdm.nodes.map(cur => ({
      id: cur.frontmatter.id,
      title: cur.frontmatter.title,
      section: moduleIDToSectionMap[cur.frontmatter.id],
      url: moduleIDToURLMap[cur.frontmatter.id],
    }));
  }, [data.allXdm]);
  const showConfetti = useContext(ConfettiContext);
  const handleCompletionChange = progress => {
    if (moduleProgress === progress) return;
    setModuleProgress(markdownData.id, progress);
    if (
      moduleProgress !== 'Complete' &&
      (progress === 'Practicing' || progress === 'Complete')
    ) {
      showConfetti!();
    }
  };

  // problemSolutionContext is null when markdownData is a ModuleInfo
  const problemSolutionContext = useContext(ProblemSolutionContext);
  let activeIDs: string[] = [];
  if (markdownData instanceof ModuleInfo) {
    activeIDs.push(markdownData.id);
  } else {
    activeIDs = problemSolutionContext!.modulesThatHaveProblem.map(x => x.id);
  }
const [mounted, setMounted] = useState(false);
useEffect(() => { setMounted(true); }, []);

  return (
    <MarkdownLayoutContext.Provider
      value={{
        markdownLayoutInfo: markdownData,
        sidebarLinks: moduleLinks,
        activeIDs,
        uniqueID: null,
        isMobileNavOpen,
        setIsMobileNavOpen,
        moduleProgress,
        handleCompletionChange,
      }}
    >
      <ContactUsSlideoverProvider>
        <ProblemSuggestionModalProvider>
          <MobileSideNav />

          {/* PIN BUTTON and SIDEBAR are siblings in a relative container */}
          <div className="relative">
    <DesktopSidebar
      pinned={sidebarPinned}
      hovering={sidebarHovering}
      setHovering={setSidebarHovering}
    />
    {mounted && (
      <PinButton
        isCollapsed={!sidebarPinned && !sidebarHovering}
        sidebarPinned={sidebarPinned}
        onClick={() => setSidebarPinned(p => !p)}
      />
    )}
  </div>


          <div className="w-full">
            <MobileAppBar />
            <ContentContainer tableOfContents={tableOfContents}>
              <NotSignedInWarning />
              <ModuleHeaders moduleLinks={moduleLinks} />
              <div className={tableOfContents.length > 1 ? '2xl:hidden' : ''}>
                <TableOfContentsBlock tableOfContents={tableOfContents} />
              </div>
              {children}
              <ModuleProgressUpdateBanner />
              <ForumCTA />
            </ContentContainer>
          </div>
        </ProblemSuggestionModalProvider>
      </ContactUsSlideoverProvider>
    </MarkdownLayoutContext.Provider>
  );
}