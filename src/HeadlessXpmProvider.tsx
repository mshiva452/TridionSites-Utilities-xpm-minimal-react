import React, { createContext, useContext, useEffect, useState } from "react";
import { TridionBar } from "./TridionBar";

interface HeadlessXpmContextProps {
  editorUrl: string;
  icon?: React.ReactNode;
  linkStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
  showExpSpaceEditor: boolean;
  showPageEditorLink?: boolean
  toggleXpm: boolean;
  pageId:string;
  showPage:boolean;
  setPageId:(pageId:string) => void;
  setShowPage:(setShowPage:boolean) => void;
}

const HeadlessXpmContext = createContext<undefined | HeadlessXpmContextProps>(undefined);

export const useHeadlessXpmContext = () => {
  const ctx = useContext(HeadlessXpmContext);
  if (!ctx) {
    throw new Error("useHeadlessXpmContext must be used within HeadlessXpmProvider");
  }
  return ctx;
};

type ProviderProps = {
  editorUrl: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  linkStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties,
  contentStyle?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
  showExpSpaceEditor?: boolean;
  showPageEditorLink?: boolean
};

export const HeadlessXpmProvider: React.FC<ProviderProps> = ({ editorUrl, icon, children, linkStyle, containerStyle, contentStyle, iconStyle, showPageEditorLink = false, showExpSpaceEditor = true }) => {
  const [toggleXpm, setToggleXpm] = useState<boolean>(false);
  const [showPage, setShowPage] = useState(false);
  const [pageId, setPageId] = useState<string>("");

  return (
    <HeadlessXpmContext.Provider
      value={{ editorUrl, icon, linkStyle, containerStyle, contentStyle, iconStyle, showExpSpaceEditor, showPageEditorLink, toggleXpm, pageId, showPage, setPageId, setShowPage }}>
      {children}
      {showExpSpaceEditor && <TridionBar setToggleXpm={setToggleXpm} toggleXpm={toggleXpm} />}
    </HeadlessXpmContext.Provider>
  );
};
