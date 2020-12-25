import React from "react";

const preloadStyles = {
  maxHeight: 0,
  maxWidth: 0,
  opacity: 0,
  position: "absolute",
  top: "-100%",
  left: "-100%"
};

export const Preload_lazy_components = (props) => {
  const [actPreload, setActPreload] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => {
      setActPreload(false);
    }, 500);
    return () => {
      clearTimeout(t);
    };
  });

  if (actPreload) {
    return (
      <div style={preloadStyles} hidden>
        {props.routes.map(route =>
          <route.component preload key={route.path} />
        )}
      </div>
    );
  }
  else {
    return null
  }

};
