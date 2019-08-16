import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Form, Button, Input, Message } from "semantic-ui-react";

import { Layout } from "../../_components";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      address: "",
      addressTo: "",
      balance: 0,
      loading: false,
      errorMessage: false
    };
  }

  async componentDidMount() {
    await this.setState({
      address: this.props.user.meta ? this.props.user.meta.bkcAddress : 0
    });
    await this.balanceOf.call(this, this.state.address);
  }

  async balanceOf(_address) {
    await this.setState({ loading: true, errorMessage: "" });
    let balance;
    try {
      balance = await this.props.contract.methods.balanceOf(_address).call();
    } catch (err) {
      console.log(err);
      await this.setState({ errorMessage: err.message });
    }

    await this.setState({ loading: false });
    await this.setState({ balance });
  }

  render() {
    return (
      <Layout>
        <h2 className="section-title text-center">Welcome to Cretex</h2>
        <p className="lead text-center">
          Cretex is an application that helps companies exchange services and
          products using our own token as currency.
        </p>
        <div className="space30" />
        <div className="row text-center">
          <div className="col-sm-4">
            {" "}
            <span className="icon icon-m icon-color color-blue mb-20">
              <i className="si-seo_website-code" />
            </span>
            <h5>Pixel-Perfect Code</h5>
            <p>
              Nulla vitae elit libero, a pharetra augue. Donec id elit non mi
              porta gravida at eget metus. Cras justo odio dapibus ac facilisis
              in egestas eget quam.
            </p>
          </div>
          {/*/column */}
          <div className="col-sm-4">
            {" "}
            <span className="icon icon-m icon-color color-green mb-20">
              <i className="si-seo_optimization-growth-stats" />
            </span>
            <h5>SEO-Friendly</h5>
            <p>
              Nulla vitae elit libero, a pharetra augue. Donec id elit non mi
              porta gravida at eget metus. Cras justo odio dapibus ac facilisis
              in egestas eget quam.
            </p>
          </div>
          {/*/column */}
          <div className="col-sm-4">
            {" "}
            <span className="icon icon-m icon-color color-orange mb-20">
              <i className="si-design_color-drop" />
            </span>
            <h5>Color Palettes</h5>
            <p>
              Nulla vitae elit libero, a pharetra augue. Donec id elit non mi
              porta gravida at eget metus. Cras justo odio dapibus ac facilisis
              in egestas eget quam.
            </p>
          </div>
          {/*/column */}
          <div className="space20 hidden-xs clearfix" />
          <div className="col-sm-4">
            {" "}
            <span className="icon icon-m icon-color color-red mb-20">
              <i className="si-camping_life-preserver" />
            </span>
            <h5>Free Support &amp; Updates</h5>
            <p>
              Nulla vitae elit libero, a pharetra augue. Donec id elit non mi
              porta gravida at eget metus. Cras justo odio dapibus ac facilisis
              in egestas eget quam.
            </p>
          </div>
          {/*/column */}
          <div className="col-sm-4">
            {" "}
            <span className="icon icon-m icon-color color-yellow mb-20">
              <i className="si-mail_read-mail" />
            </span>
            <h5>Working Contact Form</h5>
            <p>
              Nulla vitae elit libero, a pharetra augue. Donec id elit non mi
              porta gravida at eget metus. Cras justo odio dapibus ac facilisis
              in egestas eget quam.
            </p>
          </div>
          {/*/column */}
          <div className="col-sm-4">
            {" "}
            <span className="icon icon-m icon-color color-purple mb-20">
              <i className="si-design_pen-tool" />
            </span>
            <h5>Clean &amp; Professional Design</h5>
            <p>
              Nulla vitae elit libero, a pharetra augue. Donec id elit non mi
              porta gravida at eget metus. Cras justo odio dapibus ac facilisis
              in egestas eget quam.
            </p>
          </div>
          {/*/column */}
        </div>
        {/*/.row */}
        {/* <img src={require("../../dist/style/images/logo2@2x.png")} /> */}
        {/* {(user) ? (
                    <div className="col-md-6 col-md-offset-3">
                        <h1>Hi {user.name}!</h1>
                        <p>You're logged in with React!!</p>
                        <div>
                            <h2>My Balance: {this.state.balance}</h2>
                        </div>
                    </div>
                ) : (
                        <h2 className="section-title mb-40 text-center">Please login, or register!</h2>
                    )} */}
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return {
    user
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
