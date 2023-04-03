import styles from "./MainLayout.module.scss";
import { TopBar } from "./components/Topbar/TopBar";
import { PlainObject } from "src/models";
import { PropsWithChildren } from "react";

export function MainLayout<P = PlainObject>({ children }: PropsWithChildren<P>): JSX.Element {
  return (
    <>
      <div className={styles.layout}>
        <div className={styles.header}>
          <TopBar />
        </div>
        <div className={styles.body}>
          <div className={styles.wrapper}>
            <div className={styles.content_container}>
              <div className={styles.content}>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
