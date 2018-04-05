import React, { Component } from 'react';

class Album extends Component {
  render() {
    return (
      <section className="Album">
        {this.props.match.params.slug} these albums
      </section>
    );
  }
}


export default Album;
