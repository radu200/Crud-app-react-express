import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Posts from './posts';
import AddPosts from './add-posts';
import PostDetails from './postDetails';
import About from './about';


const Routes = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Posts} />
      <Route exact path='/about' component={About} />
      <Route exact path='/posts/add' component={AddPosts} />
      <Route exact path='/posts/:id' component={PostDetails} />
    </Switch>
  </main>
)

export default Routes;