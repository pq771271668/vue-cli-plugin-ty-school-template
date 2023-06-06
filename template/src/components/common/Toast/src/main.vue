<!--
 * @Author: your name
 * @Date: 2021-09-14 10:58:37
 * @LastEditTime: 2022-01-10 10:06:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tyedu-ui\packages\toast\src\main.vue
-->
<template>
  <div class="ty-toast-main">
    <div
      class="ty-toast-mask"
      @touchmove.prevent
      @mousewheel.prevent
      :style="bgStyle"
      v-if="mask"
    ></div>
    <div class="ty-toast" :class="classStr">
      <p class="ty-toast-message" v-html="message"></p>
    </div>
  </div>
</template>
<script>
const typeMap = {
    success: "success",
    info: "info",
    error: "error",
    warning: "warning",
    wait: "wait",
    load: "load",
};
export default {
    name: "TyToast",
    data() {
        return {
            type: "info",
            message: "",
            mask: false,
            bgColor: "",
            enterAni: "ty-toast-enter",
            leaveAni: "ty-toast-leave",
            classAni: "",
            duration: 1500,
            onLeave: null,
            timer: null,
            center:false
        };
    },
    computed: {
        bgStyle() {
            return this.bgColor ? { "background-color": this.bgColor } : null;
        },
        classStr() {
            let typeClass = "";
            if (this.type) {
                typeClass = typeMap[this.type] ? "ty-toast-type-" + typeMap[this.type] : this.type;
            }
            if (this.center) {
                typeClass = typeClass + ' ty-toast-center '
            }
            return typeClass + " " + this.classAni;
        },
    },
    created() {
        this.classAni = this.enterAni;
    },
    mounted() {
        if (this.duration != "keep" && this.type != "wait" && this.type != "load") {
            this.leave();
        }
    },
    methods: {
        leave() {
            this.timer = setTimeout(() => {
                clearTimeout(this.timer);
                this.classAni = this.leaveAni;
                this.removeEl();
            }, this.duration);
        },
        removeEl() {
            this.timer = setTimeout(() => {
                clearTimeout(this.timer);
                this.$destroy(true);
                this.$el.parentNode && this.$el.parentNode.removeChild(this.$el);
                this.onLeave && this.onLeave();
            }, 300);
        },
        close() {
            this.duration = 0;
            this.leave();
        },
    },
};
</script>
<style lang="scss" scoped>
@import './toast.scss';
</style>
