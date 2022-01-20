<template>
  <div v-if="done && !error">
    <ul
      v-if="posts.length > 0"
      class="m-list__plane posts-list">
      <li
        v-for="(item, index) in posts.slice(0, num)"
        :key="index">
        <a
          :href="item.link"
          target="_blank"
          rel="noopener">{{ item.title }}</a>
      </li>
    </ul>
    <p
      v-else
      class="posts-err">
      該当記事はありません
    </p>
  </div>
  <p
    v-else-if="error"
    class="posts-err">
    記事を取得できませんでした
  </p>
  <Loading
    v-else
    class="posts-err" />
</template>

<script>
import Magazine from "../../../modules/Magazine"
import Loading from "./Loading"

export default {
  components: {
    Loading
  },
  extends: Magazine
}
</script>

<style lang="scss" scoped>
@use "../../../../style/foundation/global" as g;
.tab-container {
  margin: 0 auto;
  width: 100%;
  max-width: 808px;
  margin-bottom: 64px;
}
.posts-list {

  li {
    padding-left: g.$mgn-ss;
    padding-right: g.$mgn-ss;
    margin-bottom:  g.$mgn-s;
    font-size: 14px;
    @include g.mq {
      font-size: 16px;
    }
  }

  a {
    font-weight: normal;
    line-height: 1.75;
    position: relative;
    text-decoration: underline;
    display: inline;
  }
}

.posts-err {
  @include g.Text(1.4rem);
  color: g.$gray2;
}

::v-deep {
  .v-slide-group__content {
    justify-content: center;
  }
  .v-tabs-slider-wrapper {
    border-color: #00708D;
    .v-tabs-slider {
      background-color: #00708D;
    }
  }
  &.v-tab--active {
    color: #00708D;
  }
}

</style>
