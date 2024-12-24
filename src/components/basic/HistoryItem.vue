<template>
  <div class="history-item">
    <div class="live-cover">
      <slot name="cover"></slot>
    </div>
    <div class="live-info">
      <div class="live-title">
        <slot name="title"></slot>
      </div>
      <div class="live-time">
        <slot name="time"></slot>
      </div>
      <div class="live-host">
        <slot name="host"></slot>
      </div>
    </div>
  </div>
</template>
<style  lang="scss">
$drop-item:#606266;
$drop-item-hover:#409eff;
$drop-fill:rgb(235.9, 245.3, 255);

.history-item {
  display: flex;
  justify-content: center;
  padding: 10px;
  width: auto;
  cursor: pointer;
  &:hover{
    background-color: $drop-fill;
    color: $drop-item-hover;
  }

  img{
    height: 3rem;
  }
  .live-info {
    height: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
    *{
      font-size: small;
      margin: 0;
    }
  }
}
</style>
