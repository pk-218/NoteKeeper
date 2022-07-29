import * as Sentry from "@sentry/react";

import { BrowserRouter as Router } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { NotesList } from "./components/Notes/NotesList";

function App() {
  return (
    <Router>
      <Header />
      <NotesList />
      <Footer />
    </Router>
  );
}

// export default Sentry.withProfiler(App);
export default App;
