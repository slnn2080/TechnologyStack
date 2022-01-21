<template>
  <div class="m-txt__normal--center">
    <ul class="sk-bouncedelay">
      <li />
      <li />
      <li />
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.sk-bouncedelay {
  li {
    display: inline-block;
    width: 14px;
    height: 14px;
    margin: 0;
    backface-visibility: hidden;
    background: #69A7BF;
    border-radius: 100%;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    &:nth-child(1) {
      animation-delay: -0.32s;
    }
    &:nth-child(2) {
      animation-delay: -0.16s;
    }
  }
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>
