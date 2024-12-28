<template>
  <div class="live-about-item">
    <div class="item-cover">
      <slot name="cover"></slot>
    </div>
    <div class="item-title">
      <slot name="title"></slot>
    </div>
    <div class="host">
      <slot class="host"></slot>
    </div>
  </div>
</template>
<style lang="scss">
.live-about-item {
  padding: 5px;
  margin: 0.5rem;
  width: 15%;
  border-radius: 5%;
  background-color: rgb(222, 211, 209,0.8);
  box-shadow: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s;
  &:hover {
    transform: translateY(-10px) ;
  }

  *{
    width: 100%;
  }
  .item-cover{

    flex: 3;
    img{
      object-fit: cover;
    }
  }
  .item-title{
    align-items: center;
    flex: 1;
    p{
      // text-align: center;
      margin: 0.6rem;
    }
  }

}
</style>
