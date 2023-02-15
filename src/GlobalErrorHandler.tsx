import {
  useCallback,
  useEffect,
  Component,
  FunctionComponent,
  PropsWithChildren,
} from "react";
import { useNavigate } from "react-router";

interface IGlobalErrorHandlerWrapper extends PropsWithChildren {
  routeToErrorPage: () => void;
}

interface IGlobalErrorHandlerWrapperState {
  hasError: boolean;
}

// this handler will catch all errors during render time of the UI
class GlobalErrorHandlerWrapper extends Component<
  IGlobalErrorHandlerWrapper,
  IGlobalErrorHandlerWrapperState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError = (_error: any) => ({ hasError: true });

  render() {
    // if there is an error, route to the error page and refresh the document
    // (needs page refresh because the UI is corrupt after an render error)

    if (this.state.hasError) {
      this.props.routeToErrorPage();
      return null;
    }

    return this.props.children;
  }
}

export const GlobalErrorHandler: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const navigate = useNavigate();

  const errorHandler = useCallback(
    (_msg: any, _url: any, _lineNo: any, _columnNo: any, error: any) => {
      // falsy error, just return (errors like GlobalResizeObserver and etc. that are falsy)
      if (!error) return;

      // route to error page when the error occurred
      navigate("/404");

      return true;
    },
    [navigate]
  );

  const unhandledErrorRejectionHandler = useCallback(
    (_error: any) => {
      // route to error page when the error occurred
      navigate("/404");

      return true;
    },
    [navigate]
  );

  useEffect(() => {
    window.onerror = errorHandler;
    window.onunhandledrejection = unhandledErrorRejectionHandler;

    return () => {
      window.onerror = null;
      window.onunhandledrejection = null;
    };
  }, [errorHandler, unhandledErrorRejectionHandler]);

  return (
    <GlobalErrorHandlerWrapper
      routeToErrorPage={() => {
        navigate("/404");
        document.location.reload();
      }}
    >
      {children}
    </GlobalErrorHandlerWrapper>
  );
};
