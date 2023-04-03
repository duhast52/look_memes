import { css, SerializedStyles } from "@emotion/react";
import { Theme } from "@material-ui/core";

export const useStyles = (theme: Theme): SerializedStyles => css`
  .loading-container {
    background-color: ${theme.palette.background.default};
    height: 100%;

    .grid {
      height: 100%;
    }

    .content {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${theme.palette.primary.main};
    }

    .absolute {
      position: absolute;
    }

    .overlay {
      position: fixed;
      top: 64px;
      left: 0;
      z-index: 999;
      width: calc(100%);
      height: calc(100% - 64px);
      background-color: rgba(0, 0, 0, 0.2);

      ${theme.breakpoints.up("md")} {
        left: 240px;
        width: calc(100% - 240px);
      }

      &.full-screen {
        left: 0;
        width: calc(100%);
        top: 0;
        height: 100%;
      }

      &.full-content {
        left: 0;
        width: calc(100%);
      }

      &.fill-container {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9;
      }
    }
  }

  .loading-container.absolute-overlay {
    position: absolute;
  }
`;
