import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';

import { ButtonContainer } from '@/containers/ButtonContainer';

import './pages';
import './templates';

const hydrateContainers = document.querySelectorAll('[partial-hydrate]');

const getPartialHydrateComponent = (componentName?: string): JSX.Element | undefined => {
  switch (componentName) {
    case 'button-container': {
      return <ButtonContainer />;
    }
  }
};
for (const container of hydrateContainers) {
  const componentName = container.attributes?.getNamedItem('partial-hydrate')?.value;
  const component = getPartialHydrateComponent(componentName);
  if (component) {
    ReactDOMClient.hydrateRoot(container, <React.StrictMode>{component}</React.StrictMode>);
  }
}
