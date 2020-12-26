export function movieRichSnippet(post) {
  let richObj = {};
  if (
    post &&
    post.summary &&
    post.summary.casts &&
    post.summary.casts.directors &&
    post.summary.casts.directors.length === 0
  ) {
    return false;
  }
  richObj = {
    "@context": "http://schema.org",
    "@type": "Movie",
    "@id": `12`,
    url: `movieUrl`,
    name: `${post && post.summary ? post.summary.name : ""}`,
    director: {
      "@type": "Person",
      name: `${
        post &&
        post.summary &&
        post.summary.casts &&
        post.summary.casts.directors &&
        post.summary.casts.directors.length > 0 &&
        post.summary.casts.directors[0].user
          ? post.summary.casts.directors[0].user.fullname
          : ""
      }`
    },
    dateCreated: `${post && post.summary && post.summary.produce_year ? post.summary.produce_year : ""}`
  };
  if (post && post.summary) {
    if (post.summary.story) {
      richObj.description = `${post.summary.story.slice(0, 200)}`;
    }
    if (post.summary.produce_year) {
      richObj.releasedEvent = {
        "@type": "PublicationEvent",
        startDate: `${post.summary.produce_year}`
      };
    }
    if (post.summary.movieRating) {
      if (post.summary.movieRating.users_rate_count > 0) {
        richObj.aggregateRating = {
          "@type": "AggregateRating",
          ratingCount: `${post.summary.movieRating.users_rate_count}`,
          worstRating: "1",
          bestRating: "10",
          ratingValue: `3`
        };
      }
    }
    if (post.summary.casts) {
      // if(post.summary.casts.directors &&
      //     post.summary.casts.directors.length > 0 &&
      //     post.summary.casts.directors[0].user ){
      //   richObj.director = {
      //     "@type": "Person",
      //     "name":` ${post.summary.casts.directors[0].user.fullname}`
      //   }
      // }
      if (post.summary.casts.actors && post.summary.casts.actors.length > 0) {
        richObj.actor = [];
        if (post.summary.casts.actors[0] && post.summary.casts.actors[0].user) {
          richObj.actor.push({
            "@type": "Person",
            name: post.summary.casts.actors[0].user.fullname
          });
        }
        if (post.summary.casts.actors[1] && post.summary.casts.actors[1].user) {
          richObj.actor.push({
            "@type": "Person",
            name: post.summary.casts.actors[1].user.fullname
          });
        }
        if (post.summary.casts.actors[2] && post.summary.casts.actors[2].user) {
          richObj.actor.push({
            "@type": "Person",
            name: post.summary.casts.actors[2].user.fullname
          });
        }
      }
    }
    if (post.summary.poster.medium === undefined) {
      return false;
    }
    if (post.summary.poster && post.summary.poster.medium) {
      richObj.image = `${post.summary.poster.medium}`;
    }
  }
  if (post && post.longCritics && post.longCritics.length > 0) {
    richObj.review = {
      "@type": "Review",
      name: post.longCritics[0].full_title,
      reviewBody: post.longCritics[0].abstrac,
      itemReviewed: {
        "@type": "CreativeWork",
        url: "url"
      },
      // abstract: post.longCritics[i].abstrac,
      // reviewRating: {
      //   "@type": "Rating",
      //   worstRating: "1",
      //   ratingValue: post.longCritics[i].average_vote,
      //   bestRating: "10"
      // },
      author: {
        "@type": "Person",
        name:
          post.longCritics[0] && post.longCritics[0].user ? post.longCritics[0].user.fullname : ""
      }
    };
  }
  return JSON.stringify(richObj);
}
