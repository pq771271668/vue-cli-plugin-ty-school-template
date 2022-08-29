<template>
  <div class="ty-popup-panel-main" v-if="visable">
    <div
      class="ty-popup-panel-mask"
      @touchmove.prevent
      @mousewheel.prevent
      :style="bgStyle"
      v-if="mask"
    ></div>
    <div class="ty-popup-panel" :class="classStr">
      <div class="ty-popup-panel-head" v-if="!showHead">
        <span class="ty-popup-panel-title">{{ title }}</span>
        <button class="ty-popup-panel-close" @click.stop="close()"></button>
      </div>
      <slot name="header"></slot>
      <div class="ty-popup-panel-content">
        <slot></slot>
        <div class="ty-popup-panel-option" v-if="showOption">
          <button
            v-for="(btn, idx) in option"
            :key="idx"
            :class="
              btn === '取消'
                ? 'ty-popup-panel-cancel'
                : 'ty-popup-panel-confirm ' + btnAni
            "
            @click="btn === '取消' ? _cancel() : _confirm()"
          >
            {{ btn }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dragBox from "./drag.js";

const genStyle = function(el) {
  return `position:fixed;z-index:999;width:${el.clientWidth}px;height:${
    el.clientHeight
  }px;top:50%;left:50%;margin-left:${-el.clientWidth /
    2}px;margin-top:${-el.clientHeight / 2}px;`;
};

export default {
  name: "TyPopupPanel",
  props: {
    title: String,
    customClass: String,
    hideHead: {
      type: Boolean,
      default: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
    mask: {
      type: Boolean,
      default: true,
    },
    drag: {
      type: Boolean,
      default: false,
    },
    bgColor: String,
    option: Array,
  },
  data() {
    return {
      visable: false,
      enterAni: "ty-popup-panel-enter",
      leaveAni: "ty-popup-panel-leave",
      classAni: "",
      btnAni: "",
      duration: 0,
      timer: null,
      curEl: null,
    };
  },
  computed: {
    classStr() {
      return this.classAni + " " + this.customClass;
    },
    bgStyle() {
      return this.bgColor ? { "background-color": this.bgColor } : null;
    },
    showHead() {
      return this.hideHead || this.$slots.header;
    },
    curShow() {
      return this.show;
    },
    showOption() {
      return (
        this.option &&
        Object.prototype.toString.call(this.option) == "[object Array]" &&
        this.option.length > 0
      );
    },
  },
  watch: {
    curShow(v) {
      if (!v) {
        this.close();
      } else {
        this.classAni = this.enterAni;
        this.visable = true;
        this.$emit('onOpen',this);
        this.$nextTick(() => {
          this._enterHandel();
        });
      }
    },
  },
  created() {
    this.visable = this.curShow;
    this.classAni = this.enterAni;
  },
  mounted() {
    this.$nextTick(() => {
      if (this.visable) {
        this._enterHandel();
      }
    });
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
        this.visable = false;
        this.$emit('onClose',this);
      }, 300);
    },
    close() {
      if (!this.visable) return;
      this.btnAni = "";
      this.duration = 0;
      this.leave();
    },
    _cancel() {
      if (this.btnAni) return;
      this.duration = 0;
      this.$emit('onCancel',this);
      this.leave();
    },
    _confirm() {
      this.btnAni = "ty-popup-panel-confirm-load";
      this.$emit('onConfirm',this);
    },
    _enterHandel() {
      this.curEl = this.mask ? this.$el.children[1] : this.$el.children[0];
      this.curEl.style.cssText = genStyle(this.curEl);
      this.drag && new dragBox(this.curEl);
    },
  },
  activated() {
    console.log("打开");
  },
};
</script>
<style lang="scss" scoped>
@import './popup-panel.scss';
</style>
