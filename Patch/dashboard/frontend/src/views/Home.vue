<template>
  <div class="home">
    <div class="row">
    Home
    </div>

    <div class="row">
      <div class="card-slot">
        <el-row :gutter="10">
        </el-row>
      </div>
    </div>

    <div class="row">
    </div>

    <div class="row">
      <div class="card-slot">
        <el-row :gutter="10">
        </el-row>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.row {
  margin-bottom: 3.125rem; // 50px;
  &:last-child {
    margin-bottom: 0rem;
  }
}

.gallery-thumbs .swiper-slide {
  opacity: 0.4;
}
// for vue-awesome-swiper
// .gallery-thumbs .swiper-slide-active {
//   opacity: 1;
// }
// for original swiper
.gallery-thumbs .swiper-slide-thumb-active {
  opacity: 1;
}
.swiper-button-next, .swiper-button-prev {
  top: 40%;
  // width: 10%;
  height: 20%;
  margin-top: 0rem;
}
.swiper-slot .bg {
  // height: 100%;
  width: 100%;
}
.swiper-slot .cover {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0rem;
  top: 0rem;

  // display: table;

  display: flex;
  justify-content: center;
  align-items: center;
}
.swiper-slot .cover .inner {
  // display: table-cell;
  // vertical-align: middle;
  // text-align: center;

  width: 100%;
}
.swiper-slot .cover .inner .row-pc {
  display: flex;
  justify-content: left;
  align-items: center;
}
.swiper-slot .cover .inner .title {
  font-size: 2.5rem; // 40px;
  font-weight: 500;
  color: #fff;
  text-align: left;
  margin-bottom: 1rem;
}
.swiper-slot .cover .inner .content {
  font-size: 1.25rem; // 20px
  color: #fff;
  text-align: left;
}
.swiper-slot .cover .inner .space {
  margin: 0.625rem; // 10px;
}
.swiper-slot .cover .inner .img {
  width: 100%; 
}
.card-slot,
.text-slot {
  padding: 0.5rem;
}
.card-slot .header {
  font-size: 2.25rem; // 36px;
  font-weight: 500;
  color: #232F3E; // #122739;
  text-align: center;
  margin-bottom: 0.625rem; // 10px
}
.card-slot .card {
  margin-bottom: 1.25rem; // 20px
}
.card-slot .img {
  width: 100%;
}
.card-slot .card .title {
  font-size: 1.125rem; // 18px
  color: #007EB9;
  font-weight: 500;
}
.card-slot .card .content {
  font-size: 0.8125rem; // 13px
  font-weight: 500;
  color: #333;
}
.text-slot .card {
  background: #F2F4f4;
}
.text-slot .title {
  font-size: 2.25rem; // 36px;
  font-weight: 500;
  color: #232F3E; // #232F3E;
  text-align: center;
}
.text-slot .content {
  font-size: 1.25rem; // 20px
  font-weight: 500;
  color: #333;
  text-align: left;
}
</style>

<script>
// original swiper
import Swiper from 'swiperjs';
import 'swiper/css/swiper.min.css'; // import in 'config.js'

// vue-awesome-swiper
// import 'swiper/dist/css/swiper.min.css';

import { mapState, mapGetters } from 'vuex';

import utils from '@/common/utils';

export default {
  name: 'Home',
  // components: {
  // },
  data() {
    return {
      lang: '',
      resizeFlag: null,
    };
  },
  // props: {
  // },
  computed: {
    ...mapState({
      logColor: state => state.logColor.home
    }),
    ...mapGetters('lang', ['langSet']),
    ...mapGetters('device', ['device'])
  },
  beforeCreate() {
    let vm = this;
    if (process.env.NODE_ENV === 'development') {
      window.addEventListener('resize', () => {
        if (vm.resizeFlag) {
          clearTimeout(vm.resizeFlag);
        }
        vm.resizeFlag = setTimeout(() => {
          vm.resizeFlag = null;
          vm.updateHandle();
        }, 100);
      });
    }
  },
  created() {
    console.log('%c[Home]created()', `color:${this.logColor}`);
  },
  mounted() {
    console.log('%c[Home]mounted()', `color:${this.logColor}`);
    this.lang = utils.storage.cookie.get('lang');
    this.updateHandle();

    this.$nextTick(() => {
      if (this.originalSwiper === true) {
      } else {
        // for vue-awesome-swiper thumbs
        // const swiperTop = this.$refs.swiperTop.swiper;
        // const swiperThumbs = this.$refs.swiperThumbs.swiper;
        // swiperTop.controller.control = swiperThumbs;
        // swiperThumbs.controller.control = swiperTop;
      }
    });
  },
  destroyed() {
    console.log('%c[Home]destroyed()', `color:${this.logColor}`);
  },
  updated() {
    console.log('%c[Home]updated()', `color:${this.logColor}`);
    this.lang = utils.storage.cookie.get('lang');
    this.updateHandle();
  },
  beforeRouteEnter(to, from, next) {
    console.log('%c[Home]beforeRouteEnter(\"%s\" => \"%s\")', 'color:black', from.fullPath, to.fullPath);
    next(vm => {
      // console.log(vm);
      console.log('%c[Home]beforeRouteEnter(\"%s\" => \"%s\") next', `color:${vm.logColor}`, from.fullPath, to.fullPath);
    });
  },
  beforeRouteUpdate(to, from, next) {
    console.log('%c[Home]beforeRouteUpdate(\"%s\" => \"%s\")', `color:${this.logColor}`, from.fullPath, to.fullPath);
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log('%c[Home]beforeRouteLeave(\"%s\" => \"%s\")', `color:${this.logColor}`, from.fullPath, to.fullPath);
    next();
  },
  methods: {
    getImgUrl(type, param1, param2) {
      if (type === 'banner') {
        return require('@/assets/images/banner/banner-' + (param1) + '.png');
      } else if (type === 'banner-bg') {
        return require('@/assets/images/banner/banner-bg-' + (param1) + '.png');
      } else if (type === 'card') {
        return require('@/assets/images/card/card-' + (param1) + '-' + (param2) + '.png');
      } else {}
    },
    updateHandle() {
      // TODO
    }
  }
};
</script>