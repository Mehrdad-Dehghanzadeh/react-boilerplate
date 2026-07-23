
import { Outlet } from "@tanstack/react-router";
import clsx from "clsx";
import "./style.scss";

export function Layout() {
  return (
    <main className={clsx("layout")}>
      <div className="container">
        <Outlet />
      </div>
    </main>
  );
}
