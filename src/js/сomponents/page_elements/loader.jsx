import React, {useEffect} from 'react';

export function Fallback_loader(props) {
  return (
    <div id="fallback_loader_panel"></div>
  )
}

export function Loader(props) {
  useEffect(() => {
    window.addEventListener('load', hidden_loader, true )
  });
  return (
    <div id="loader_panel">
      <div className="loader"></div>
    </div>
  )
}


function hidden_loader(history, path_to) {
  document.querySelector("#loader_panel").classList.add("is_hidden")
  window.removeEventListener('load', hidden_loader, true )
}
