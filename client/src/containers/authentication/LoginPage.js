import React, { PropTypes } from 'react';
import LoginForm from '../../components/authentication/LoginForm';


class LoginPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    console.log('email:', this.state.user.email);
    console.log('password:', this.state.user.password);

    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

         // console.log('state', data)
    fetch('/login',{
      method:'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: formData 
     }).then((res) => {   
     if (res.status !== 200) {
     return res.json().then((data) => {
    //   console.log('data',data)
        const errors = data.errors ? data.errors : {};
        this.setState({
          errors
        });
      });   
      } else{
     
        this.setState({
        errors: {}
      });

      this.props.history.push('/')
          }   
     }).catch((err) => {
      console.log('err',err)
   })

  }

 
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  
  render() {
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }

}

export default LoginPage;