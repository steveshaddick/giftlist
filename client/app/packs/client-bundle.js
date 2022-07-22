import ReactOnRails from 'react-on-rails';

import GiftListPage from 'pages/GiftListPage';
import HomePage from 'pages/HomePage';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HomePage,
  GiftListPage,
});
