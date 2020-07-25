<template lang="pug">
.col-xs-10.col-lg-9.article-conntainer
  .container.text-start
      h1 {{ $toLocale(article, 'name', $i18n.locale) }}
      img.width-100(
          v-lazy-load :data-src="'/uploads/'+image"
      )
  .container.text-start
      p(
          v-if="article"
          v-html="$toLocale(article, 'text', $i18n.locale)"
      )
      .spacer
</template>

<script>
export default {
  async asyncData({ app, params }) {
    try {
      const article = await app.$api("get", "article", {
        params: {
          slug: params.slug
        }
      });

      return { article };
    } catch (err) {
      console.log(err.path, err.statusMessage);
    }
  },
  computed: {
    image() {
      return this.article.hasOwnProperty("image")
        ? this.article.image.split(",")[0]
        : "default.png";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/base/_variables";

.article {
  margin-top: 20px;

  @media #{$media_lg} {
    margin-top: 0;
  }
}
h1 {
  font-size: 32px;
  line-height: 1.29em;
  font-weight: normal;
  color: #000;
  margin-bottom: 40px;
}

.categories {
  padding: 0;
  margin: 0;
  list-style-type: none;
  margin-bottom: 40px;

  a {
    color: #103324;
    text-decoration: none;
    font-size: 14px;
    font-weight: 300;
    line-height: 3em;
    color: #103324;
  }
}

.aside {
  padding-top: 24px;
}

.article-link {
  font-family: "Lora", sans-serif;
  font-size: 22px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.18em;
  letter-spacing: normal;
  color: #103324;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.article-conntainer {
  @media #{$media_lg} {
    padding-right: 30px;
  }

  img {
    opacity: 0;
  }
}

.ui-tag {
  margin-bottom: 20px;
}

@media #{$media_lg} {
  font-size: 36px;
}

.bg-hero {
  background-image: url("/images/banner2.jpg");
}

.image-wrap {
  box-shadow: -1px 13px 20px 0 rgba(197, 197, 197, 0.31);
  background-image: url("https://cdn.shopify.com/s/files/1/1068/2502/products/Shadow-Aloe-Infusion-9oz_d3ec928d-c570-4b86-afb9-f8f985547468.jpg");
  display: flex;
  background-color: var(--c_primary);

  &:before {
    content: "";
    display: block;
    padding-top: 100%;
    background: #fff;
  }
}

#share {
  width: 100%;
  margin: 100px auto;
  text-align: center;
}

/* buttons */
#share a {
  width: 50px;
  height: 50px;
  display: inline-block;
  margin: 8px;
  border-radius: 50%;
  font-size: 24px;
  color: #fff;
  opacity: 0.75;
  transition: opacity 0.15s linear;
}

#share a:hover {
  opacity: 1;
}

/* icons */
#share i {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

/* colors */
.facebook {
  background: #3b5998;
}

.twitter {
  background: #55acee;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.googleplus {
  background: #dd4b39;
}

.linkedin {
  background: #0077b5;
}

.pinterest {
  background: #cb2027;
}

p {
  font-size: 18px;
  font-weight: 300;
  line-height: 1.83em;
  color: #000000;

  &.gray {
    color: #7e8f97;
  }
}

.videoWrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  height: 0;
}

.videoWrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.container {
  padding-left: 0;
  padding-right: 0;

  @media #{$media_lg} {
    padding-left: 20px;
    padding-right: 20px;
  }
}

.article-conntainer {
  & > .container {
    padding-top: 5px;
  }

  h1 {
    margin-top: 0;
  }
}
</style>
