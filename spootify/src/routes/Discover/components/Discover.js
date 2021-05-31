import React, { Component } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss";
import {
  getClientToken,
  getNewReleases,
  getFeaturedPlaylists,
  getCategories,
} from "../../../api";

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
      accessToken: "",
    };
  }

  componentDidMount() {
    this.initSession();
  }

  async getData() {
    const { accessToken } = this.state;

    // new releases
    const { albums } = await getNewReleases(accessToken);

    // featured playlists
    const { playlists } = await getFeaturedPlaylists(accessToken);

    // browse categories
    const { categories } = await getCategories(accessToken);

    this.setState({
      newReleases: albums.items,
      playlists: playlists.items,
      categories: categories.items,
    });
  }

  async initSession() {
    const { data } = await getClientToken();
    if (data) {
      this.setState({ accessToken: data.access_token }, () => this.getData());
    }
  }

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock
          text="RELEASED THIS WEEK"
          id="released"
          data={newReleases}
        />
        <DiscoverBlock
          text="FEATURED PLAYLISTS"
          id="featured"
          data={playlists}
        />
        <DiscoverBlock
          text="BROWSE"
          id="browse"
          data={categories}
          imagesKey="icons"
        />
      </div>
    );
  }
}
