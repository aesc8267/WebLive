<script setup>
  import { useRouter } from 'vue-router';
  import { reactive, onMounted } from 'vue';

  const props = defineProps({});

  const data = reactive({});

  const router = useRouter();
</script>

<template>
  <div class="flex-col page">
    <div class="flex-row items-center section">
      <img
        class="shrink-0 image_9"
        src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=19dfd7544390abfef3d1c24cb68101fa.png"
      />
      <div class="flex-col justify-start items-start flex-1 text-wrapper">
        <span class="font text">输入搜索内容</span>
      </div>
      <img
        class="shrink-0 image_2 image_3"
        src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=c123f7a68b4b2a9747ebc14848cbf26f.png"
      />
      <div class="flex-row shrink-0 section_2">
        <div class="flex-col items-center group">
          <img
            class="image_4"
            src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=513badc4da4b9d906e43ae2a2ebf5720.png"
          />
          <span class="mt-8 font_2 text_2">喜欢</span>
        </div>
        <div class="flex-col items-center group">
          <img
            class="image_5"
            src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=aaa6b21f3ba34fa70e8706ec4a5c2b39.png"
          />
          <span class="font_2 text_3 mt-9">收藏</span>
        </div>
        <div class="flex-col items-center group">
          <img
            class="image_6"
            src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=77eba15af58ffe92ab2f23f06aac454e.png"
          />
          <span class="mt-8 font_2 text_4">历史</span>
        </div>
        <div class="flex-col items-center group">
          <img
            class="image_10"
            src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=a283425f90db7065691a7707e191010a.png"
          />
          <span class="font_2 text_5 mt-9">好友</span>
        </div>
        <div class="flex-col items-center group">
          <img
            class="image_7"
            src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=163f70db843df374080bee23f249fefb.png"
          />
          <span class="font_2 text_6 mt-5">消息</span>
        </div>
        <div class="flex-col items-center group">
          <img
            class="image_8"
            src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=01e702a0f2884b7d3a803010a591caee.png"
          />
          <span class="mt-6 font_2 text_7">创建</span>
        </div>
      </div>
      <img
        class="shrink-0 image"
        src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=317f697eec0a5bce9c590f62a45e971e.png"
      />
    </div>
    <div class="flex-col group_2">
      <div class="flex-row">
        <div class="flex-1 section_3"></div>
        <div class="ml-18 flex-col shrink-0 group_3">
          <div class="flex-row section_4">
            <div class="flex-row items-center self-center">
              <img
                class="image_11"
                src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=71e35614588842560e0009826eb88e02.png"
              />
              <div class="ml-10 flex-col">
                <div class="flex-col justify-start items-center self-stretch text-wrapper_2">
                  <span class="text_8">房主名</span>
                </div>
                <span class="self-center font_3 text_9 mt-15">房间名</span>
              </div>
            </div>
            <div class="flex-col self-start group_4 ml-281">
              <div class="flex-row items-center group_5">
                <img
                  class="image_12"
                  src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=61e8f830431996a3f20cd03fc78696bd.png"
                />
                <span class="ml-18 font_3">123</span>
              </div>
              <div class="mt-14 flex-row items-center">
                <img
                  class="image_13"
                  src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=d8b820fc2447c7fe25afcb4e3b9b46e0.png"
                />
                <span class="ml-12 font_3">123</span>
              </div>
            </div>
          </div>
          <div class="flex-row">
            <div class="flex-col items-center section_5">
              <img
                class="image_14"
                src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=394dbcf4c803c9381405e9d790e853ca.png"
              />
              <img
                class="image_14 mt-51"
                src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=9e8f5ccdb0c16be47650596865b6341b.png"
              />
              <img
                class="image_14 mt-51"
                src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=5c2e7fa79fd769013eb6fd8845b3f653.png"
              />
              <img
                class="image_14 mt-51"
                src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=1b8e45f69c3105becbb0af66ba6e7b0f.png"
              />
              <img
                class="image_14 mt-51"
                src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=57c0a69c84e7746f2477c66b1fda7e03.png"
              />
            </div>
            <div class="flex-col section_6">
              <div class="flex-col relative group_6">
                <div class="flex-col">
                  <div class="flex-row">
                    <div class="flex-col justify-start items-center shrink-0 self-start text-wrapper_3">
                      <span class="font_5">一二三四五</span>
                    </div>
                    <div class="ml-4 flex-col justify-start shrink-0 text-wrapper_4">
                      <span class="font_4 text_10">测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
                    </div>
                  </div>
                  <div class="mt-10 flex-col">
                    <div class="flex-row">
                      <div class="flex-col justify-start items-center shrink-0 self-start text-wrapper_3">
                        <span class="font_5">一二三四五</span>
                      </div>
                      <div class="ml-4 flex-col justify-start shrink-0 text-wrapper_4">
                        <span class="font_4 text_10">测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
                      </div>
                    </div>
                    <div class="mt-10 flex-row">
                      <div class="flex-col justify-start items-center shrink-0 self-start text-wrapper_3">
                        <span class="font_5">一二三四五</span>
                      </div>
                      <div class="ml-4 flex-col justify-start shrink-0 text-wrapper_4">
                        <span class="font_4 text_10">测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-10 flex-col">
                  <div class="flex-row">
                    <div class="flex-col justify-start items-center shrink-0 self-start text-wrapper_3">
                      <span class="font_5">一二三四五</span>
                    </div>
                    <div class="ml-4 flex-col justify-start shrink-0 text-wrapper_4">
                      <span class="font_4 text_10">测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
                    </div>
                  </div>
                  <div class="mt-10 flex-col">
                    <div class="flex-row">
                      <div class="flex-col justify-start items-center text-wrapper_5">
                        <span class="font_5">一二三四五</span>
                      </div>
                      <div class="ml-4 flex-col justify-start items-start text-wrapper_6">
                        <span class="font_4 text_11">1111111111111111111111</span>
                      </div>
                    </div>
                    <div class="mt-10 flex-row">
                      <div class="flex-col justify-start items-center text-wrapper_3">
                        <span class="font_5">一二三四五</span>
                      </div>
                      <div class="ml-4 flex-col justify-start items-start text-wrapper_7">
                        <span class="font_4 text_12">测试</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-10 flex-row">
                  <div class="flex-col justify-start items-center shrink-0 self-start text-wrapper_3">
                    <span class="font_5">一二三四五</span>
                  </div>
                  <div class="ml-4 flex-col justify-start shrink-0 text-wrapper_8">
                    <span class="font_4 text_13">
                      测试测试33333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex-row section_7">
                <div class="flex-col justify-start items-start text-wrapper_9">
                  <span class="font text_14">输入发送内容</span>
                </div>
                <img
                  class="ml-10 image_2 image_15"
                  src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=0bd9c149792566cd4506a9c911c57e13.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-row mt-19">
        <div class="flex-col justify-start relative section_8"><div class="section_9"></div></div>
        <div class="ml-34 flex-col justify-start relative section_8"><div class="section_9"></div></div>
        <div class="ml-34 flex-col justify-start relative section_8"><div class="section_9"></div></div>
        <div class="ml-34 flex-col justify-start section_8"><div class="section_9"></div></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .mt-9 {
    margin-top: 0.56rem;
  }
  .mt-5 {
    margin-top: 0.31rem;
  }
  .mt-15 {
    margin-top: 0.94rem;
  }
  .ml-281 {
    margin-left: 17.56rem;
  }
  .mt-51 {
    margin-top: 3.19rem;
  }
  .mt-19 {
    margin-top: 1.19rem;
  }
  .page {
    background-color: #fff8f7;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    .section {
      padding: 1.19rem 2.38rem 0.69rem 3.38rem;
      background-color: #fbeaeb;
      overflow: hidden;
      border-left: solid 0.063rem #d6c2c4;
      border-right: solid 0.063rem #d6c2c4;
      border-top: solid 0.063rem #d6c2c4;
      border-bottom: solid 0.063rem #d6c2c4;
      .image_9 {
        width: 3.19rem;
        height: 3rem;
      }
      .text-wrapper {
        margin-left: 4rem;
        padding: 1.38rem 0 1.13rem;
        background-color: #ffffff;
        border-radius: 1.25rem;
        overflow: hidden;
        height: 3.75rem;
        border-left: solid 0.063rem #847375;
        border-right: solid 0.063rem #847375;
        border-top: solid 0.063rem #847375;
        border-bottom: solid 0.063rem #847375;
        .text {
          margin-left: 1.25rem;
          line-height: 1.14rem;
        }
      }
      .image_3 {
        margin-left: 0.63rem;
      }
      .section_2 {
        margin-left: 3rem;
        background-color: #f5e4e5;
        border-radius: 1.25rem;
        height: 5.13rem;
        border-left: solid 0.063rem #d6c2c4;
        border-right: solid 0.063rem #d6c2c4;
        border-top: solid 0.063rem #d6c2c4;
        border-bottom: solid 0.063rem #d6c2c4;
        .group {
          padding: 0.75rem 0;
          border-radius: 1.25rem;
          width: 5rem;
          height: 5rem;
          .image_4 {
            width: 1.94rem;
            height: 1.75rem;
          }
          .font_2 {
            font-size: 1.25rem;
            font-family: Alibaba PuHuiTi;
            line-height: 1.19rem;
            color: #524345;
          }
          .text_2 {
            line-height: 1.14rem;
          }
          .image_5 {
            width: 1.38rem;
            height: 1.69rem;
          }
          .text_3 {
            line-height: 1.16rem;
          }
          .image_6 {
            width: 1.94rem;
            height: 1.81rem;
          }
          .text_4 {
            line-height: 1.13rem;
          }
          .image_10 {
            width: 2.13rem;
            height: 1.56rem;
          }
          .text_5 {
            line-height: 1.14rem;
          }
          .image_7 {
            width: 1.56rem;
            height: 2rem;
          }
          .text_6 {
            line-height: 1.12rem;
          }
          .image_8 {
            width: 1.94rem;
            height: 1.94rem;
          }
          .text_7 {
            line-height: 1.15rem;
          }
        }
      }
      .image {
        margin-left: 2.44rem;
        width: 5rem;
        height: 5rem;
      }
    }
    .group_2 {
      padding: 2.44rem 2.5rem 0;
      overflow: hidden;
      .section_3 {
        border-radius: 2.5rem;
        overflow: hidden;
        background-image: url('https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=f990c2ba1ae1838a78c9f6a21b8cd8bb.png');
        background-position: 0% 0%;
        background-size: 100%, 100%;
        background-repeat: no-repeat;
        height: 42.19rem;
        border-left: solid 0.063rem #d6c2c4;
        border-right: solid 0.063rem #d6c2c4;
        border-top: solid 0.063rem #d6c2c4;
        border-bottom: solid 0.063rem #d6c2c4;
      }
      .group_3 {
        border-radius: 2.5rem;
        width: 38.88rem;
        height: 42.31rem;
        border-left: solid 0.063rem #d6c2c4;
        border-right: solid 0.063rem #d6c2c4;
        border-top: solid 0.063rem #d6c2c4;
        border-bottom: solid 0.063rem #d6c2c4;
        .section_4 {
          padding: 0.75rem 1.25rem 1rem;
          background-color: #fbeaeb;
          border-radius: 2.5rem 2.5rem 0rem 0rem;
          filter: drop-shadow(0rem 0.25rem 0.13rem #00000040);
          overflow: hidden;
          border-top: solid 0.063rem #d6c2c4;
          border-bottom: solid 0.063rem #d6c2c4;
          .image_11 {
            width: 4.5rem;
            height: 4.5rem;
          }
          .text-wrapper_2 {
            padding: 0.5rem 0;
            border-radius: 0.63rem;
            overflow: hidden;
            width: 7.19rem;
            .text_8 {
              color: #22191b;
              font-size: 2rem;
              font-family: Alibaba PuHuiTi;
              line-height: 1.85rem;
            }
          }
          .font_3 {
            font-size: 1.5rem;
            font-family: Alibaba PuHuiTi;
            line-height: 1.07rem;
            color: #524345;
          }
          .text_9 {
            line-height: 1.39rem;
          }
          .group_4 {
            margin-top: 0.63rem;
            width: 6.38rem;
            .group_5 {
              padding: 0 0.38rem;
              .image_12 {
                width: 1.38rem;
                height: 1.5rem;
              }
            }
            .image_13 {
              width: 2.06rem;
              height: 2.06rem;
            }
          }
        }
        .section_5 {
          padding: 2.5rem 0;
          background-color: #fbeaeb;
          border-radius: 0rem 0rem 0rem 2.5rem;
          width: 6rem;
          height: 35.19rem;
          border-left: solid 0.063rem #d6c2c4;
          border-right: solid 0.063rem #d6c2c4;
          border-top: solid 0.063rem #d6c2c4;
          border-bottom: solid 0.063rem #d6c2c4;
          .image_14 {
            width: 3.5rem;
            height: 3.5rem;
          }
        }
        .section_6 {
          background-color: #fff0f1;
          border-radius: 0rem 0rem 2.5rem 0rem;
          overflow: hidden;
          width: 32.75rem;
          height: 35.19rem;
          border-right: solid 0.063rem #d6c2c4;
          border-top: solid 0.063rem #d6c2c4;
          border-bottom: solid 0.063rem #d6c2c4;
          .group_6 {
            margin-top: -0.69rem;
            padding: 0 1.25rem 1.25rem;
            .text-wrapper_3 {
              padding: 0.88rem 0;
              background-color: #ffd9de;
              border-radius: 1.25rem;
              width: 7.38rem;
              height: 2.63rem;
            }
            .text-wrapper_4 {
              margin-right: 1.25rem;
              padding: 0.75rem 0 0.63rem;
              background-color: #ffddbb;
              border-radius: 1.25rem;
              width: 21.38rem;
              height: 4rem;
              .text_10 {
                margin-left: 0.63rem;
                margin-right: 1.13rem;
              }
            }
            .text-wrapper_5 {
              padding: 1rem 0;
              background-color: #ffd9de;
              border-radius: 1.25rem;
              width: 7.38rem;
              height: 2.63rem;
            }
            .font_5 {
              font-size: 1rem;
              font-family: Alibaba PuHuiTi;
              line-height: 0.82rem;
              color: #5c3f44;
            }
            .text-wrapper_6 {
              padding: 1rem 0;
              background-color: #ffddbb;
              border-radius: 1.25rem;
              width: 21.38rem;
              height: 2.63rem;
              .text_11 {
                margin-left: 0.75rem;
                line-height: 0.69rem;
              }
            }
            .font_4 {
              font-size: 1rem;
              font-family: Alibaba PuHuiTi;
              line-height: 1.19rem;
              color: #2b1700;
            }
            .text-wrapper_7 {
              padding: 0.88rem 0;
              background-color: #ffddbb;
              border-radius: 1.25rem;
              width: 21.38rem;
              height: 2.63rem;
              .text_12 {
                margin-left: 0.63rem;
                line-height: 0.9rem;
              }
            }
            .text-wrapper_8 {
              margin-right: 1.25rem;
              padding: 0.75rem 0 0.5rem;
              background-color: #ffddbb;
              border-radius: 1.25rem;
              width: 21.38rem;
              height: 4rem;
              .text_13 {
                margin-left: 0.63rem;
                margin-right: 0.88rem;
              }
            }
          }
          .section_7 {
            padding: 0.63rem 0.63rem 1.25rem;
            background-color: #fff0f1;
            .text-wrapper_9 {
              padding: 1.38rem 0 1.13rem;
              background-color: #ffffff;
              border-radius: 1.25rem;
              overflow: hidden;
              width: 26.5rem;
              height: 3.75rem;
              border-left: solid 0.063rem #847375;
              border-right: solid 0.063rem #847375;
              border-top: solid 0.063rem #847375;
              border-bottom: solid 0.063rem #847375;
              .text_14 {
                margin-left: 1.25rem;
                line-height: 1.16rem;
              }
            }
            .image_15 {
              margin-right: 0.63rem;
            }
          }
        }
      }
      .section_8 {
        flex: 1 1 27.13rem;
        padding-top: 9.25rem;
        box-shadow: 0rem 0rem 0.63rem #0000001a;
        background-color: #fff8f7;
        border-radius: 2.5rem 2.5rem 0 0;
        height: 14.38rem;
        border-left: solid 0.063rem #d6c2c4;
        border-right: solid 0.063rem #d6c2c4;
        border-top: solid 0.063rem #d6c2c4;
        border-bottom: solid 0.063rem #d6c2c4;
        .section_9 {
          background-color: #fbeaeb;
          border-radius: 2.5rem 2.5rem 0 0;
          height: 5rem;
          border-left: solid 0.063rem #d6c2c4;
          border-right: solid 0.063rem #d6c2c4;
          border-top: solid 0.063rem #d6c2c4;
          border-bottom: solid 0.063rem #d6c2c4;
        }
      }
    }
    .font {
      font-size: 1.25rem;
      font-family: Alibaba PuHuiTi;
      line-height: 1.19rem;
      color: #75565b;
    }
    .image_2 {
      border-radius: 1.25rem;
      width: 3.75rem;
      height: 3.75rem;
    }
  }
</style>