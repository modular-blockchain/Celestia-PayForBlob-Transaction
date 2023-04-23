<template>
  <div class="main">
    <h1 class="font-thin mb-2 mt-5">
      Celestia blockspace PayForBlob transaction
    </h1>

    <div class="namespaceId items-center justify-center p-12">
      <!-- <div class="textBase">Namespace Id</div> -->

      <div class="w-full px-3">
        <div class="mb-2">
          <label
            for="fName"
            class="mb-3 block text-base font-medium text-[#07074D]"
          >
            Namespace Id:
            <div :class="[{ ['none']: NAME_SPACE_ID_ORIGIN === namespace_id }]">
              {{ namespace_id }}
            </div>
          </label>
        </div>
      </div>

      <div class="textBase btnBase btnGenerate" @click="onGenerateNamespaceId">
        Generate
      </div>
    </div>
    <div class="row dataSubmit">
      <div class="textBase">Data</div>
      <textarea v-model="data" placeholder="Input data!" class="input" />
    </div>
    <div class="row">
      <div class="textBase">Gas Limit</div>
      <input v-model="gas_limit" type="number" placeholder="0" class="input" />
    </div>
    <div class="row">
      <div class="textBase">Fee</div>
      <input v-model="fee" type="number" placeholder="0" class="input" />
    </div>
    <div class="row">
      <div class="textBase">IP Address</div>
      <input
        v-model="ip_address"
        :placeholder="`ex: ${IP_ADDRESS_DEFAULT}`"
        class="input"
      />
    </div>
    <div class="row">
      <div class="textBase">Port</div>
      <input
        v-model="port"
        type="number"
        :placeholder="`ex: ${PORT_DEFAULT}`"
        class="input"
      />
    </div>

    <button
      class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
      :class="['btnBase', 'btnSubmit', { ['disabled']: isDisabled }]"
      @click="submitPFBTransaction"
    >
      Submit
    </button>
  </div>
</template>

<script>
import axios from 'axios';
import { encode } from 'hex-encode-decode';
import { computed, reactive, ref, toRefs } from 'vue';
import { useToast } from 'vue-toast-notification';

import {
  ALERT_TYPES,
  IP_ADDRESS_DEFAULT,
  MESSAGE_STATUS,
  NAME_SPACE_ID_ORIGIN,
  PORT_DEFAULT
} from 'src/constants/PFBTransaction.js';

const MINTSCAN_TXS_URL = process.env.VUE_APP_MINTSCAN_TXS;
const HOST_CORE = process.env.VUE_APP_HOST_CORE;

export default {
  name: 'PfbMain',
  setup() {
    const $toast = useToast();
    const isPending = ref(false);

    const params = reactive({
      namespace_id: NAME_SPACE_ID_ORIGIN,
      data: '',
      gas_limit: 80000,
      fee: 2000,
      ip_address: IP_ADDRESS_DEFAULT,
      port: PORT_DEFAULT
    });

    const isDisabled = computed(() => {
      const conditions = [
        params.namespace_id !== NAME_SPACE_ID_ORIGIN,
        params.data !== '',
        params.ip_address !== '',
        params.port !== '',
        +params.gas_limit !== 0,
        +params.fee !== 0,
        !isPending.value
      ];

      return conditions.some((condition) => !condition);
    });

    const onGenerateNamespaceId = () => {
      const id = Math.random()
        .toString(16)
        .slice(2)
        .split('')
        .splice(0, 8)
        .join('');
      params.namespace_id = encode(id);
    };

    const getMintscanTxsMes = (TxHash) => {
      const URL = `${MINTSCAN_TXS_URL}/${TxHash}`;
      return `<a href="${URL}" target="_blank">View detail transaction!</a>`;
    };

    const alert = (
      message = MESSAGE_STATUS.alertSuccessMes,
      type = ALERT_TYPES.success,
      duration = 5000
    ) =>
      $toast.open({
        message: message,
        type: type,
        duration: duration
      });

    const submitPFBTransaction = async () => {
      try {
        isPending.value = true;
        alert(MESSAGE_STATUS.alertPenddingMes, ALERT_TYPES.info, 0);
        console.log(`${HOST_CORE}/submit_pfb`);
        const { data } = await axios.post(`${HOST_CORE}/submit_pfb`, params);
        $toast.clear();
        data.height
          ? alert(getMintscanTxsMes(data.txhash))
          : alert(MESSAGE_STATUS.alertGasOutMes, ALERT_TYPES.error);
      } catch (error) {
        $toast.clear();
        setTimeout(() => {
          alert(MESSAGE_STATUS.alertErrorMes, ALERT_TYPES.error);
        }, 500);
      } finally {
        isPending.value = false;
      }
    };

    return {
      isDisabled,
      NAME_SPACE_ID_ORIGIN,
      IP_ADDRESS_DEFAULT,
      PORT_DEFAULT,
      onGenerateNamespaceId,
      submitPFBTransaction,
      ...toRefs(params)
    };
  }
};
</script>

<style scoped>
.main {
  margin-bottom: auto;
}

.row {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.textBase {
  width: 300px;
  height: 32px;
  font-weight: 600;
  font-size: 14px;
}

.none {
  opacity: 0.7;
}

input {
  height: 26px;
  background-color: #fcfcfc;
  border: 1px solid #dadce0;
  border-radius: 4px;
  font-size: 14px;
  padding-left: 10px;
}

input:focus {
  outline: none;
}

input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

h1 {
  margin-bottom: 40px;
}

.btnBase {
  height: 32px;
  width: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 15px;
  cursor: pointer;
  font-size: 12px;
  background-color: #7b2bf9;
}

.namespaceId {
  display: flex;
}

.namespaceId > div:nth-child(2) {
  font-size: 14px;
  width: 300px;
}

.btnGenerate {
  margin-top: -8px;
}

.dataSubmit {
  align-items: flex-start;
}

.dataSubmit textarea {
  height: 92px;
  border: 1px solid #dadce0;
  font-size: 14px;
  padding: 10px;
}

.dataSubmit textarea:focus-visible {
  border: 1px solid #dadce0;
  outline: none;
}

.btnSubmit {
  margin-top: 60px;
  border-radius: 30px;
  height: 48px;
  width: 150px;
  font-size: 16px;
  font-weight: 600;
  background-color: #25c9d0;
  border: none;
}

.disabled {
  cursor: not-allowed;
  pointer-events: none;
  opacity: 0.5;
}
</style>
