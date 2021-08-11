import React from "react";
import { Box } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//components
import Header from "./components/Header";
import Home from "./components/home/Home";
import About from "./components/about/About"
import Contact from "./components/contact/Contact"
import DetailView from "./components/post/DetailView";
import CreateView from "./components/post/CreateView";
import UpdateView from "./components/post/UpdateView";
import Auth from "./components/auth/Auth";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Box style={{ marginTop: 64 }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/details/:id" component={DetailView} />
          <Route path="/create" component={CreateView} />
          <Route path="/update/:id" component={UpdateView} />
          <Route path="/auth" component={Auth} />
        </Switch>
      </Box>
    </BrowserRouter>
  );
}

export default App;
