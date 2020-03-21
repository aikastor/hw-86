import React, {Component, Fragment} from 'react';
import Toolbar from "./components/UI/Toolbar/Toolbar";
import Posts from "./containers/Posts/Posts";
import {Container} from "reactstrap";
import {Route, Switch} from "react-router-dom";
import NewPost from "./containers/NewPost/NewPost";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import PostPage from "./containers/PostPage/PostPage";

class App extends Component {
  render() {
    return (
      <Fragment>
        <header>
          <Toolbar/>
        </header>
        <Container style={{marginTop: '20px'}}>
          <Switch>
            <Route path="/" exact component={Posts} />
            <Route path="/register" exact component={Register}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/posts/new" exact component={NewPost} />
            <Route path="/posts/:id" exact component={PostPage} />
          </Switch>
        </Container>
      </Fragment>
    );
  }
}

export default App;