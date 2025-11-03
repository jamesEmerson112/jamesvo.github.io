<div class="content">
  <div class="content_inner">
    <slot />
  </div>
</div>

<style>
  .content {
    position: fixed;
    z-index: 2;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    mix-blend-mode: difference;
  }
  
  .content_inner {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
