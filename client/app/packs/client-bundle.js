import ReactOnRails from 'react-on-rails';

import UserProfilePage from 'pages/UserProfilePage';
import GiftListPage from 'pages/GiftListPage';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  UserProfilePage,
  GiftListPage,
});
