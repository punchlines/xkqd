<script>

  import config from '@/js/config';

const onlineSite='';
const upload = config.DEV ?'http://192.168.0.123:8192/' : 'https://xk.gzskxx.com/usercenter-service/';
const uploadImage= config.DEV ? 'http://192.168.0.148:8096/' : 'https://xk.gzskxx.com/apemoon-order/';
  export default
  {
    onlineSite,//线上地址
	upload, //123端口
	uploadImage, //148端口
  }
</script>