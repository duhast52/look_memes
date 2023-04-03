/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { cn } from "../../utils/cn";
import { CircularProgress, Grid, useTheme } from "@material-ui/core";

import { useStyles } from "./MainLoader.styles";

interface MainLoaderProps {
  block?: boolean;
  fullScreen?: boolean;
  fullContent?: boolean;
  fillContainer?: boolean;
  absolute?: boolean;
}

export function MainLoader({ block, fullScreen, fillContainer, fullContent, absolute }: MainLoaderProps): JSX.Element {
  const theme = useTheme();
  const styles = useStyles(theme);

  return (
    <div css={styles}>
      <div className={`${absolute ? "absolute-overlay" : ""} loading-container`}>
        <div
          className={cn("loader", {
            overlay: !block,
            "full-screen": fullScreen,
            "full-content": fullContent,
            "fill-container": fillContainer,
          })}>
          <Grid className="grid" container>
            <Grid className="content" item md={12} lg={12}>
              <CircularProgress color="inherit" />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
