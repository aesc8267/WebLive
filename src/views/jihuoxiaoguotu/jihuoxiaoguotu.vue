<script setup>
  import { useRouter } from 'vue-router';
  import { reactive, onMounted } from 'vue';

  const props = defineProps({});

  const data = reactive({});

  const router = useRouter();
</script>

<template>
  <div class="flex-col justify-start page">
    <div class="flex-col group">
      <div class="flex-row justify-between section">
        <div class="flex-row items-center self-center">
          <img
            class="image"
            src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=71e35614588842560e0009826eb88e02.png"
          />
          <div class="flex-col ml-5">
            <div class="flex-col justify-start items-center self-stretch text-wrapper">
              <span class="text">房主名</span>
            </div>
            <span class="self-center font text_2 mt-7-5">房间名</span>
          </div>
        </div>
        <div class="flex-col self-start group_2">
          <div class="flex-row items-center group_3">
            <img
              class="image_2"
              src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=61e8f830431996a3f20cd03fc78696bd.png"
            />
            <span class="font ml-9">123</span>
          </div>
          <div class="flex-row items-center mt-7">
            <img
              class="image_3"
              src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=d8b820fc2447c7fe25afcb4e3b9b46e0.png"
            />
            <span class="font ml-6-5">123</span>
          </div>
        </div>
      </div>
      <div class="flex-row">
        <div class="flex-col items-center shrink-0 section_2">
          <img
            class="image_4"
            src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=e57593aaf6fa33f15965cba1882f363f.png"
          />
          <img
            class="image_5"
            src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=44afb435a4d0b00883a07ec0c37d12d3.png"
          />
          <img
            class="image_6"
            src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=a03f0de9d6766f40066db97f7fb85860.png"
          />
          <img
            class="image_7"
            src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=1857ab4bd55c08e16027c42e5666698f.png"
          />
          <img
            class="image_8"
            src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=0d4ef4d91c89fbc2482582e8d0550377.png"
          />
        </div>
        <div class="flex-col flex-1 section_3">
          <div class="flex-row items-center group_4">
            <div class="flex-col shrink-0 group_5">
              <div class="section_4"></div>
              <div class="section_4 mt-28-5"></div>
              <div class="section_4 mt-28-5"></div>
            </div>
            <div class="flex-col flex-1 ml-5">
              <div class="flex-col justify-start items-center self-start text-wrapper_2">
                <span class="font_2">用户名12122131</span>
              </div>
              <div class="flex-col justify-start self-stretch text-wrapper_3">
                <span class="font_3 text_3">测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
              </div>
              <div class="flex-col justify-start items-center self-start text-wrapper_2 view">
                <span class="font_2">用户名12122131</span>
              </div>
              <div class="flex-col justify-start self-stretch text-wrapper_3">
                <span class="font_3 text_3">测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
              </div>
              <div class="flex-col justify-start self-start text-wrapper_4">
                <span class="font_2 text_4">用户名12111111111111111111111111111111111122131</span>
              </div>
              <div class="flex-col justify-start self-stretch text-wrapper_3">
                <span class="font_3 text_3">测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
              </div>
            </div>
          </div>
          <div class="flex-row mt-15">
            <div class="flex-col justify-start items-start flex-1 text-wrapper_5">
              <span class="text_5">输入发送内容</span>
            </div>
            <img
              class="shrink-0 image_9 ml-5"
              src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=7e15806f135fb6e28d551acf9c188a11.png"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .mt-7-5 {
    margin-top: 0.47rem;
  }
  .ml-9 {
    margin-left: 0.56rem;
  }
  .mt-7 {
    margin-top: 0.44rem;
  }
  .ml-6-5 {
    margin-left: 0.41rem;
  }
  .mt-28-5 {
    margin-top: 1.78rem;
  }
  .mt-15 {
    margin-top: 0.94rem;
  }
  .ml-5 {
    margin-left: 0.31rem;
  }
  .page {
    padding: 0.28rem 0;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    .group {
      margin: 0 0.25rem;
      border-radius: 1.25rem;
      border-left: solid 0.031rem #d6c2c4;
      border-right: solid 0.031rem #d6c2c4;
      border-top: solid 0.031rem #d6c2c4;
      border-bottom: solid 0.031rem #d6c2c4;
      .section {
        padding: 0.38rem 0.63rem 0.5rem;
        background-color: #fbeaeb;
        border-radius: 1.25rem 1.25rem 0rem 0rem;
        filter: drop-shadow(0rem 0.13rem 0.063rem #00000040);
        overflow: hidden;
        border-top: solid 0.031rem #d6c2c4;
        border-bottom: solid 0.031rem #d6c2c4;
        .image {
          width: 2.25rem;
          height: 2.25rem;
        }
        .text-wrapper {
          padding: 0.25rem 0;
          border-radius: 0.31rem;
          overflow: hidden;
          width: 3.59rem;
          .text {
            color: #22191b;
            font-size: 1rem;
            font-family: Alibaba PuHuiTi;
            line-height: 0.93rem;
          }
        }
        .font {
          font-size: 0.75rem;
          font-family: Alibaba PuHuiTi;
          line-height: 0.54rem;
          color: #524345;
        }
        .text_2 {
          line-height: 0.69rem;
        }
        .group_2 {
          margin-top: 0.31rem;
          width: 3.19rem;
          .group_3 {
            padding: 0 0.19rem;
            .image_2 {
              width: 0.69rem;
              height: 0.75rem;
            }
          }
          .image_3 {
            width: 1.03rem;
            height: 1.03rem;
          }
        }
      }
      .section_2 {
        padding: 1.44rem 0 1.5rem;
        background-color: #fbeaeb;
        border-radius: 0rem 0rem 0rem 1.25rem;
        width: 3rem;
        height: 17.59rem;
        border-left: solid 0.031rem #d6c2c4;
        border-right: solid 0.031rem #d6c2c4;
        border-top: solid 0.031rem #d6c2c4;
        border-bottom: solid 0.031rem #d6c2c4;
        .image_4 {
          width: 1.59rem;
          height: 1.41rem;
        }
        .image_5 {
          margin-top: 1.94rem;
          width: 1.22rem;
          height: 1.34rem;
        }
        .image_6 {
          margin-top: 1.81rem;
          width: 1.75rem;
          height: 1.75rem;
        }
        .image_7 {
          margin-top: 1.75rem;
          width: 1.47rem;
          height: 1.34rem;
        }
        .image_8 {
          margin-top: 2.13rem;
          width: 0.28rem;
          height: 1.16rem;
        }
      }
      .section_3 {
        padding: 2.59rem 0.31rem 0.56rem;
        background-color: #fff0f1;
        border-radius: 0rem 0rem 1.25rem 0rem;
        overflow: hidden;
        height: 17.59rem;
        border-right: solid 0.031rem #d6c2c4;
        border-top: solid 0.031rem #d6c2c4;
        border-bottom: solid 0.031rem #d6c2c4;
        .group_4 {
          padding: 0 0.31rem;
          .group_5 {
            width: 2.25rem;
            .section_4 {
              background-color: #d9d9d9;
              border-radius: 50%;
              height: 2.25rem;
              border-left: solid 0.031rem #847375;
              border-right: solid 0.031rem #847375;
              border-top: solid 0.031rem #847375;
              border-bottom: solid 0.031rem #847375;
            }
          }
          .text-wrapper_2 {
            padding: 0.44rem 0;
            background-color: #ffd9de;
            border-radius: 0.63rem;
            width: 5.03rem;
          }
          .text-wrapper_3 {
            margin-right: 0.63rem;
            margin-top: 0.13rem;
            padding: 0.38rem 0 0.31rem;
            background-color: #ffddbb;
            border-radius: 0.63rem;
            .font_3 {
              font-size: 0.5rem;
              font-family: Alibaba PuHuiTi;
              line-height: 0.59rem;
              color: #2b1700;
            }
            .text_3 {
              margin-left: 0.31rem;
              margin-right: 0.81rem;
            }
          }
          .view {
            margin-top: 0.63rem;
          }
          .text-wrapper_4 {
            margin-top: 0.63rem;
            padding: 0.44rem 0;
            background-color: #ffd9de;
            border-radius: 0.63rem;
            width: 10.63rem;
            .text_4 {
              margin-left: 0.63rem;
              margin-right: 0.31rem;
            }
          }
          .font_2 {
            font-size: 0.5rem;
            font-family: Alibaba PuHuiTi;
            line-height: 0.46rem;
            color: #5c3f44;
          }
        }
        .text-wrapper_5 {
          padding: 0.69rem 0 0.56rem;
          background-color: #ffffff;
          border-radius: 0.63rem;
          overflow: hidden;
          height: 1.88rem;
          border-left: solid 0.031rem #847375;
          border-right: solid 0.031rem #847375;
          border-top: solid 0.031rem #847375;
          border-bottom: solid 0.031rem #847375;
          .text_5 {
            margin-left: 0.63rem;
            color: #75565b;
            font-size: 0.63rem;
            font-family: Alibaba PuHuiTi;
            line-height: 0.58rem;
          }
        }
        .image_9 {
          margin-right: 0.31rem;
          border-radius: 0.63rem;
          width: 1.88rem;
          height: 1.88rem;
        }
      }
    }
  }
</style>