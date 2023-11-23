import React, { FC, useContext, useMemo } from "react";
import { MdOutlinePreview } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { GoSettings } from "react-icons/go";
import { BsShare } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import cx from "classnames";

import Filters from "./Filters";
import GraphSumUp from "./GraphSumUp";
import NodesAppearanceBlock from "./NodesAppearanceBlock";
import EditorBlock from "./EditorBlock";
import { GraphContext } from "../lib/context";
import SelectedNodePanel from "./SelectedNodePanel";
import ReadabilityBlock from "./ReadabilityBlock";
import Footer from "../components/Footer";

const LeftPanel: FC = () => {
  const { navState, embedMode, data, panel, setPanel, openModal } = useContext(GraphContext);

  const selectedNode = useMemo(
    () =>
      navState?.selectedNode && data?.graph.hasNode(navState.selectedNode)
        ? data.graph.getNodeAttributes(navState.selectedNode)
        : null,
    [data?.graph, navState?.selectedNode],
  );

  let content: JSX.Element;
  if (panel === "edit" && navState.role === "d") {
    content = <EditorBlock />;
  } else if (panel === "readability") {
    content = <ReadabilityBlock />;
  } else if (selectedNode) {
    content = <SelectedNodePanel node={navState?.selectedNode as string} data={selectedNode} />;
  } else {
    content = (
      <>
        <GraphSumUp />
        <NodesAppearanceBlock />
        <Filters />
      </>
    );
  }

  const selectedButtonClass =
    navState.role === "d" ? "btn-dark opacity-100" : "btn-outline-dark text-dark bg-info opacity-100";

  return (
    <section className="panel-left d-flex flex-column">
      <div className="panel-header border-dark">
        <div className={cx("header-buttons text-end block p-3", navState.role === "d" && "bg-info border-dark")}>
          <span className="text-nowrap">
            {navState.role === "d" && (
              <button
                className={cx("btn ms-2 mt-1", panel === "edit" ? selectedButtonClass : "btn-outline-dark")}
                onClick={() => setPanel("edit")}
                disabled={panel === "edit"}
                title="Edit available interactions and information"
              >
                <AiOutlineEdit /> Edit
              </button>
            )}
            <button
              className={cx("btn ms-2 mt-1", panel === "main" ? selectedButtonClass : "btn-outline-dark")}
              onClick={() => setPanel("main")}
              disabled={panel === "main"}
              title="Explore the graph"
            >
              <MdOutlinePreview /> Explore
            </button>
            <button
              className={cx("btn ms-2 mt-1", panel === "readability" ? selectedButtonClass : "btn-outline-dark")}
              onClick={() => setPanel("readability")}
              disabled={panel === "readability"}
              title="Edit readability settings"
            >
              <GoSettings />
            </button>
          </span>
          <span className="text-nowrap">
            {!embedMode && (
              <button
                className={cx("btn btn-outline-dark ms-2 mt-1", !!navState.local && "text-danger")}
                title="Share this visualization"
                onClick={() => openModal(navState.local ? "publish" : "share")}
              >
                <BsShare />
              </button>
            )}
            <Link className="btn btn-outline-dark ms-2 mt-1" title="Retina's homepage" to="/">
              <FaHome />
            </Link>
          </span>
        </div>
      </div>

      <div className="panel-content">
        <div className="flex-grow-1 p-0 m-0">{content}</div>

        <hr className="m-0 flex-shrink-0" />
        <div className="flex-shrink-0">
          <Footer />
        </div>
      </div>
    </section>
  );
};

export default LeftPanel;
