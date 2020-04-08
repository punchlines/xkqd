//本地服务器
//http://3f53b722.ngrok.io/tuozhanbao/
//http://192.168.0.157:8081
// const BASE_URL = "http://192.168.0.157:8081/tuozhanbao/";
//http://6dbff508.ngrok.io
//192.168.0.157:8081
// const BASE_URL = "http://6dbff508.ngrok.io/tuozhanbao/";

//http://120.79.155.171:80
// const BASE_URL = "http://120.79.155.171:80/tuozhanbao-webapi/";

//http://47.92.107.232:9080/tuozhanbao-webapi/home/getBanner
//http://47.92.107.232:9080/tuozhanbao-webapi/home/getBanner


//测试
import {
	md5
} from "./md5";

import config from "./config";

const BASE_URL = "http://192.168.0.149:8096/";

const EMOJI_REGEX = /\u{1F3F4}\u{E0067}\u{E0062}(?:\u{E0065}\u{E006E}\u{E0067}|\u{E0073}\u{E0063}\u{E0074}|\u{E0077}\u{E006C}\u{E0073})\u{E007F}|\u{1F468}(?:\u{1F3FC}\u200D(?:\u{1F91D}\u200D\u{1F468}\u{1F3FB}|[\u{1F33E}\u{1F373}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9AF}-\u{1F9B3}\u{1F9BC}\u{1F9BD}])|\u{1F3FF}\u200D(?:\u{1F91D}\u200D\u{1F468}[\u{1F3FB}-\u{1F3FE}]|[\u{1F33E}\u{1F373}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9AF}-\u{1F9B3}\u{1F9BC}\u{1F9BD}])|\u{1F3FE}\u200D(?:\u{1F91D}\u200D\u{1F468}[\u{1F3FB}-\u{1F3FD}]|[\u{1F33E}\u{1F373}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9AF}-\u{1F9B3}\u{1F9BC}\u{1F9BD}])|\u{1F3FD}\u200D(?:\u{1F91D}\u200D\u{1F468}[\u{1F3FB}\u{1F3FC}]|[\u{1F33E}\u{1F373}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9AF}-\u{1F9B3}\u{1F9BC}\u{1F9BD}])|\u200D(?:\u2764\uFE0F\u200D(?:\u{1F48B}\u200D)?\u{1F468}|[\u{1F468}\u{1F469}]\u200D(?:\u{1F466}\u200D\u{1F466}|\u{1F467}\u200D[\u{1F466}\u{1F467}])|\u{1F466}\u200D\u{1F466}|\u{1F467}\u200D[\u{1F466}\u{1F467}]|[\u{1F468}\u{1F469}]\u200D[\u{1F466}\u{1F467}]|[\u2695\u2696\u2708]\uFE0F|[\u{1F466}\u{1F467}]|[\u{1F33E}\u{1F373}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9AF}-\u{1F9B3}\u{1F9BC}\u{1F9BD}])|(?:\u{1F3FB}\u200D[\u2695\u2696\u2708]|\u{1F3FF}\u200D[\u2695\u2696\u2708]|\u{1F3FE}\u200D[\u2695\u2696\u2708]|\u{1F3FD}\u200D[\u2695\u2696\u2708]|\u{1F3FC}\u200D[\u2695\u2696\u2708])\uFE0F|\u{1F3FB}\u200D[\u{1F33E}\u{1F373}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9AF}-\u{1F9B3}\u{1F9BC}\u{1F9BD}]|[\u{1F3FB}-\u{1F3FF}])|(?:\u{1F9D1}\u{1F3FB}\u200D\u{1F91D}\u200D\u{1F9D1}|\u{1F469}\u{1F3FC}\u200D\u{1F91D}\u200D\u{1F469})\u{1F3FB}|\u{1F9D1}(?:\u{1F3FF}\u200D\u{1F91D}\u200D\u{1F9D1}[\u{1F3FB}-\u{1F3FF}]|\u200D\u{1F91D}\u200D\u{1F9D1})|(?:\u{1F9D1}\u{1F3FE}\u200D\u{1F91D}\u200D\u{1F9D1}|\u{1F469}\u{1F3FF}\u200D\u{1F91D}\u200D[\u{1F468}\u{1F469}])[\u{1F3FB}-\u{1F3FE}]|(?:\u{1F9D1}\u{1F3FC}\u200D\u{1F91D}\u200D\u{1F9D1}|\u{1F469}\u{1F3FD}\u200D\u{1F91D}\u200D\u{1F469})[\u{1F3FB}\u{1F3FC}]|\u{1F469}(?:\u{1F3FE}\u200D(?:\u{1F91D}\u200D\u{1F468}[\u{1F3FB}-\u{1F3FD}\u{1F3FF}]|[\u{1F33E}\u{1F373}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9AF}-\u{1F9B3}\u{1F9BC}\u{1F9BD}])|\u{1F3FC}\u200D(?:\u{1F91D}\u200D\u{1F468}[\u{1F3FB}\u{1F3FD}-\u{1F3FF}]|[\u{1F33E}\u{1F373}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9AF}-\u{1F9B3}\u{1F9BC}\u{1F9BD}])|\u{1F3FB}\u200D(?:\u{1F91D}\u200D\u{1F468}[\u{1F3FC}-\u{1F3FF}]|[\u{1F33E}\u{1F373}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9AF}-\u{1F9B3}\u{1F9BC}\u{1F9BD}])|\u{1F3FD}\u200D(?:\u{1F91D}\u200D\u{1F468}[\u{1F3FB}\u{1F3FC}\u{1F3FE}\u{1F3FF}]|[\u{1F33E}\u{1F373}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9AF}-\u{1F9B3}\u{1F9BC}\u{1F9BD}])|\u200D(?:\u2764\uFE0F\u200D(?:\u{1F48B}\u200D[\u{1F468}\u{1F469}]|[\u{1F468}\u{1F469}])|[\u{1F33E}\u{1F373}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9AF}-\u{1F9B3}\u{1F9BC}\u{1F9BD}])|\u{1F3FF}\u200D[\u{1F33E}\u{1F373}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9AF}-\u{1F9B3}\u{1F9BC}\u{1F9BD}])|\u{1F469}\u200D\u{1F469}\u200D(?:\u{1F466}\u200D\u{1F466}|\u{1F467}\u200D[\u{1F466}\u{1F467}])|(?:\u{1F9D1}\u{1F3FD}\u200D\u{1F91D}\u200D\u{1F9D1}|\u{1F469}\u{1F3FE}\u200D\u{1F91D}\u200D\u{1F469})[\u{1F3FB}-\u{1F3FD}]|\u{1F469}\u200D\u{1F466}\u200D\u{1F466}|\u{1F469}\u200D\u{1F469}\u200D[\u{1F466}\u{1F467}]|(?:\u{1F441}\uFE0F\u200D\u{1F5E8}|\u{1F469}(?:\u{1F3FF}\u200D[\u2695\u2696\u2708]|\u{1F3FE}\u200D[\u2695\u2696\u2708]|\u{1F3FC}\u200D[\u2695\u2696\u2708]|\u{1F3FB}\u200D[\u2695\u2696\u2708]|\u{1F3FD}\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:[\u26F9\u{1F3CB}\u{1F3CC}\u{1F575}]\uFE0F|[\u{1F46F}\u{1F93C}\u{1F9DE}\u{1F9DF}])\u200D[\u2640\u2642]|[\u26F9\u{1F3CB}\u{1F3CC}\u{1F575}][\u{1F3FB}-\u{1F3FF}]\u200D[\u2640\u2642]|[\u{1F3C3}\u{1F3C4}\u{1F3CA}\u{1F46E}\u{1F471}\u{1F473}\u{1F477}\u{1F481}\u{1F482}\u{1F486}\u{1F487}\u{1F645}-\u{1F647}\u{1F64B}\u{1F64D}\u{1F64E}\u{1F6A3}\u{1F6B4}-\u{1F6B6}\u{1F926}\u{1F937}-\u{1F939}\u{1F93D}\u{1F93E}\u{1F9B8}\u{1F9B9}\u{1F9CD}-\u{1F9CF}\u{1F9D6}-\u{1F9DD}](?:[\u{1F3FB}-\u{1F3FF}]\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\u{1F3F4}\u200D\u2620)\uFE0F|\u{1F469}\u200D\u{1F467}\u200D[\u{1F466}\u{1F467}]|\u{1F3F3}\uFE0F\u200D\u{1F308}|\u{1F415}\u200D\u{1F9BA}|\u{1F469}\u200D\u{1F466}|\u{1F469}\u200D\u{1F467}|\u{1F1FD}\u{1F1F0}|\u{1F1F4}\u{1F1F2}|\u{1F1F6}\u{1F1E6}|[#\*0-9]\uFE0F\u20E3|\u{1F1E7}[\u{1F1E6}\u{1F1E7}\u{1F1E9}-\u{1F1EF}\u{1F1F1}-\u{1F1F4}\u{1F1F6}-\u{1F1F9}\u{1F1FB}\u{1F1FC}\u{1F1FE}\u{1F1FF}]|\u{1F1F9}[\u{1F1E6}\u{1F1E8}\u{1F1E9}\u{1F1EB}-\u{1F1ED}\u{1F1EF}-\u{1F1F4}\u{1F1F7}\u{1F1F9}\u{1F1FB}\u{1F1FC}\u{1F1FF}]|\u{1F1EA}[\u{1F1E6}\u{1F1E8}\u{1F1EA}\u{1F1EC}\u{1F1ED}\u{1F1F7}-\u{1F1FA}]|\u{1F9D1}[\u{1F3FB}-\u{1F3FF}]|\u{1F1F7}[\u{1F1EA}\u{1F1F4}\u{1F1F8}\u{1F1FA}\u{1F1FC}]|\u{1F469}[\u{1F3FB}-\u{1F3FF}]|\u{1F1F2}[\u{1F1E6}\u{1F1E8}-\u{1F1ED}\u{1F1F0}-\u{1F1FF}]|\u{1F1E6}[\u{1F1E8}-\u{1F1EC}\u{1F1EE}\u{1F1F1}\u{1F1F2}\u{1F1F4}\u{1F1F6}-\u{1F1FA}\u{1F1FC}\u{1F1FD}\u{1F1FF}]|\u{1F1F0}[\u{1F1EA}\u{1F1EC}-\u{1F1EE}\u{1F1F2}\u{1F1F3}\u{1F1F5}\u{1F1F7}\u{1F1FC}\u{1F1FE}\u{1F1FF}]|\u{1F1ED}[\u{1F1F0}\u{1F1F2}\u{1F1F3}\u{1F1F7}\u{1F1F9}\u{1F1FA}]|\u{1F1E9}[\u{1F1EA}\u{1F1EC}\u{1F1EF}\u{1F1F0}\u{1F1F2}\u{1F1F4}\u{1F1FF}]|\u{1F1FE}[\u{1F1EA}\u{1F1F9}]|\u{1F1EC}[\u{1F1E6}\u{1F1E7}\u{1F1E9}-\u{1F1EE}\u{1F1F1}-\u{1F1F3}\u{1F1F5}-\u{1F1FA}\u{1F1FC}\u{1F1FE}]|\u{1F1F8}[\u{1F1E6}-\u{1F1EA}\u{1F1EC}-\u{1F1F4}\u{1F1F7}-\u{1F1F9}\u{1F1FB}\u{1F1FD}-\u{1F1FF}]|\u{1F1EB}[\u{1F1EE}-\u{1F1F0}\u{1F1F2}\u{1F1F4}\u{1F1F7}]|\u{1F1F5}[\u{1F1E6}\u{1F1EA}-\u{1F1ED}\u{1F1F0}-\u{1F1F3}\u{1F1F7}-\u{1F1F9}\u{1F1FC}\u{1F1FE}]|\u{1F1FB}[\u{1F1E6}\u{1F1E8}\u{1F1EA}\u{1F1EC}\u{1F1EE}\u{1F1F3}\u{1F1FA}]|\u{1F1F3}[\u{1F1E6}\u{1F1E8}\u{1F1EA}-\u{1F1EC}\u{1F1EE}\u{1F1F1}\u{1F1F4}\u{1F1F5}\u{1F1F7}\u{1F1FA}\u{1F1FF}]|\u{1F1E8}[\u{1F1E6}\u{1F1E8}\u{1F1E9}\u{1F1EB}-\u{1F1EE}\u{1F1F0}-\u{1F1F5}\u{1F1F7}\u{1F1FA}-\u{1F1FF}]|\u{1F1F1}[\u{1F1E6}-\u{1F1E8}\u{1F1EE}\u{1F1F0}\u{1F1F7}-\u{1F1FB}\u{1F1FE}]|\u{1F1FF}[\u{1F1E6}\u{1F1F2}\u{1F1FC}]|\u{1F1FC}[\u{1F1EB}\u{1F1F8}]|\u{1F1FA}[\u{1F1E6}\u{1F1EC}\u{1F1F2}\u{1F1F3}\u{1F1F8}\u{1F1FE}\u{1F1FF}]|\u{1F1EE}[\u{1F1E8}-\u{1F1EA}\u{1F1F1}-\u{1F1F4}\u{1F1F6}-\u{1F1F9}]|\u{1F1EF}[\u{1F1EA}\u{1F1F2}\u{1F1F4}\u{1F1F5}]|[\u{1F3C3}\u{1F3C4}\u{1F3CA}\u{1F46E}\u{1F471}\u{1F473}\u{1F477}\u{1F481}\u{1F482}\u{1F486}\u{1F487}\u{1F645}-\u{1F647}\u{1F64B}\u{1F64D}\u{1F64E}\u{1F6A3}\u{1F6B4}-\u{1F6B6}\u{1F926}\u{1F937}-\u{1F939}\u{1F93D}\u{1F93E}\u{1F9B8}\u{1F9B9}\u{1F9CD}-\u{1F9CF}\u{1F9D6}-\u{1F9DD}][\u{1F3FB}-\u{1F3FF}]|[\u26F9\u{1F3CB}\u{1F3CC}\u{1F575}][\u{1F3FB}-\u{1F3FF}]|[\u261D\u270A-\u270D\u{1F385}\u{1F3C2}\u{1F3C7}\u{1F442}\u{1F443}\u{1F446}-\u{1F450}\u{1F466}\u{1F467}\u{1F46B}-\u{1F46D}\u{1F470}\u{1F472}\u{1F474}-\u{1F476}\u{1F478}\u{1F47C}\u{1F483}\u{1F485}\u{1F4AA}\u{1F574}\u{1F57A}\u{1F590}\u{1F595}\u{1F596}\u{1F64C}\u{1F64F}\u{1F6C0}\u{1F6CC}\u{1F90F}\u{1F918}-\u{1F91C}\u{1F91E}\u{1F91F}\u{1F930}-\u{1F936}\u{1F9B5}\u{1F9B6}\u{1F9BB}\u{1F9D2}-\u{1F9D5}][\u{1F3FB}-\u{1F3FF}]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55\u{1F004}\u{1F0CF}\u{1F18E}\u{1F191}-\u{1F19A}\u{1F1E6}-\u{1F1FF}\u{1F201}\u{1F21A}\u{1F22F}\u{1F232}-\u{1F236}\u{1F238}-\u{1F23A}\u{1F250}\u{1F251}\u{1F300}-\u{1F320}\u{1F32D}-\u{1F335}\u{1F337}-\u{1F37C}\u{1F37E}-\u{1F393}\u{1F3A0}-\u{1F3CA}\u{1F3CF}-\u{1F3D3}\u{1F3E0}-\u{1F3F0}\u{1F3F4}\u{1F3F8}-\u{1F43E}\u{1F440}\u{1F442}-\u{1F4FC}\u{1F4FF}-\u{1F53D}\u{1F54B}-\u{1F54E}\u{1F550}-\u{1F567}\u{1F57A}\u{1F595}\u{1F596}\u{1F5A4}\u{1F5FB}-\u{1F64F}\u{1F680}-\u{1F6C5}\u{1F6CC}\u{1F6D0}-\u{1F6D2}\u{1F6D5}\u{1F6EB}\u{1F6EC}\u{1F6F4}-\u{1F6FA}\u{1F7E0}-\u{1F7EB}\u{1F90D}-\u{1F93A}\u{1F93C}-\u{1F945}\u{1F947}-\u{1F971}\u{1F973}-\u{1F976}\u{1F97A}-\u{1F9A2}\u{1F9A5}-\u{1F9AA}\u{1F9AE}-\u{1F9CA}\u{1F9CD}-\u{1F9FF}\u{1FA70}-\u{1FA73}\u{1FA78}-\u{1FA7A}\u{1FA80}-\u{1FA82}\u{1FA90}-\u{1FA95}]|[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299\u{1F004}\u{1F0CF}\u{1F170}\u{1F171}\u{1F17E}\u{1F17F}\u{1F18E}\u{1F191}-\u{1F19A}\u{1F1E6}-\u{1F1FF}\u{1F201}\u{1F202}\u{1F21A}\u{1F22F}\u{1F232}-\u{1F23A}\u{1F250}\u{1F251}\u{1F300}-\u{1F321}\u{1F324}-\u{1F393}\u{1F396}\u{1F397}\u{1F399}-\u{1F39B}\u{1F39E}-\u{1F3F0}\u{1F3F3}-\u{1F3F5}\u{1F3F7}-\u{1F4FD}\u{1F4FF}-\u{1F53D}\u{1F549}-\u{1F54E}\u{1F550}-\u{1F567}\u{1F56F}\u{1F570}\u{1F573}-\u{1F57A}\u{1F587}\u{1F58A}-\u{1F58D}\u{1F590}\u{1F595}\u{1F596}\u{1F5A4}\u{1F5A5}\u{1F5A8}\u{1F5B1}\u{1F5B2}\u{1F5BC}\u{1F5C2}-\u{1F5C4}\u{1F5D1}-\u{1F5D3}\u{1F5DC}-\u{1F5DE}\u{1F5E1}\u{1F5E3}\u{1F5E8}\u{1F5EF}\u{1F5F3}\u{1F5FA}-\u{1F64F}\u{1F680}-\u{1F6C5}\u{1F6CB}-\u{1F6D2}\u{1F6D5}\u{1F6E0}-\u{1F6E5}\u{1F6E9}\u{1F6EB}\u{1F6EC}\u{1F6F0}\u{1F6F3}-\u{1F6FA}\u{1F7E0}-\u{1F7EB}\u{1F90D}-\u{1F93A}\u{1F93C}-\u{1F945}\u{1F947}-\u{1F971}\u{1F973}-\u{1F976}\u{1F97A}-\u{1F9A2}\u{1F9A5}-\u{1F9AA}\u{1F9AE}-\u{1F9CA}\u{1F9CD}-\u{1F9FF}\u{1FA70}-\u{1FA73}\u{1FA78}-\u{1FA7A}\u{1FA80}-\u{1FA82}\u{1FA90}-\u{1FA95}]\uFE0F|[\u261D\u26F9\u270A-\u270D\u{1F385}\u{1F3C2}-\u{1F3C4}\u{1F3C7}\u{1F3CA}-\u{1F3CC}\u{1F442}\u{1F443}\u{1F446}-\u{1F450}\u{1F466}-\u{1F478}\u{1F47C}\u{1F481}-\u{1F483}\u{1F485}-\u{1F487}\u{1F48F}\u{1F491}\u{1F4AA}\u{1F574}\u{1F575}\u{1F57A}\u{1F590}\u{1F595}\u{1F596}\u{1F645}-\u{1F647}\u{1F64B}-\u{1F64F}\u{1F6A3}\u{1F6B4}-\u{1F6B6}\u{1F6C0}\u{1F6CC}\u{1F90F}\u{1F918}-\u{1F91F}\u{1F926}\u{1F930}-\u{1F939}\u{1F93C}-\u{1F93E}\u{1F9B5}\u{1F9B6}\u{1F9B8}\u{1F9B9}\u{1F9BB}\u{1F9CD}-\u{1F9CF}\u{1F9D1}-\u{1F9DD}]/gu

//正式
// const BASE_URL = "https://api.yidongtuozhan.com/tuozhanbao-webapi/";




function Promisenet(path, data) {
	console.log("请求接口 path = " + path);

// 	if(path == 'income/withdraw'){
//
// 	}else{
		//默认传一个版本号2
		data["version"] = "2.1";
	// }

	console.log("请求参数 data = " + JSON.stringify(data));

	return new Promise((resolve, reject) => {
		// 		uni.showLoading({
		// 			title: '请求中',
		// 			mask: false
		// 		});
		uni.request({
			url: BASE_URL + path, //+ path
			method: 'POST',
			data: data,
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			success: res => {
				let resdata = res.data;
				// uni.hideLoading();
								console.log("原始打印==" +
									JSON.stringify(resdata));
				var code = resdata['code'];
				var message = resdata['message'];
				// resolve(resdata.result);
				if (code == '0000') {
					resolve(resdata.result);
				} else {
					console.log("状态码错误的打印==" +
						JSON.stringify(resdata));
						console.log("message==" +
							message);

					uni.showToast({
						title: message,
						icon: 'loading', //loading   none  success
						mask: false,
						duration: 1500
					});
				}
			},
			fail: () => {
				reject(err);
				uni.hideLoading();
				uni.showToast({
					title: '请求失败',
					icon: 'loading', //loading   none  success
					mask: false,
					duration: 1500
				});
			},
			complete: () => {
				// console.log("请求结束");
			}
		});
	})
}

function Uploadfile(path, imageSrc, data) {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: BASE_URL + path,
			filePath: imageSrc,
			formData: data,
			name: 'headImage',
			success: (res) => {
				console.log('uploadImage success, res is:', JSON.stringify(res))
				let resdata = res.data;
				uni.hideLoading();
				var dic = JSON.parse(resdata)
				// resolve(resdata.result)
				if (dic.code == '0000') {
					// 					console.log('正确的状态值' + JSON.stringify(dic.result));
					//
					// 					console.log('路径==' +dic.result.imageUrl);
					// dic.result.imageUrl
					resolve(dic.result.imageUrl);
				} else {
					console.log("状态码错误的打印==" +
						JSON.stringify(resdata));
				}
			},
			fail: (err) => {
				reject(err);
				uni.hideLoading();
				uni.showToast({
					title: '请求失败',
					icon: 'loading', //loading   none  success
					mask: false,
					duration: 1500
				});
			},
			complete: () => {
				// console.log("complate")
			}
		})
	})
}
//获取cid
function getCid() {
	//获取cid
	var inf = plus.push.getClientInfo();
	var cidstr = encodeURIComponent(inf.clientid);
	console.log("cid内容=" + cidstr);
	// var that = this;
	var prama = {
		userId: uni.getStorageSync('userId'),
		cid: cidstr,
	}
	this.Promisenet('user/setUserCid', prama)
		.then(result => {
			console.log('cid结果==' + JSON.stringify(result));
			console.log('cid存下来了');
			//存下来
			uni.setStorageSync('cid', cidstr)
		})
		.catch(err => {
			console.log(err)
		})
	// return cidstr;
}
//却保存了cid
function cidhandle() {
	var cidstr = uni.getStorageSync('cid')
	console.log('调用了cid确保方法');
	if (this.judgeNull(cidstr)) {
		this.getCid()
	}
}
//微信登录
function wechatlogin() {
	return new Promise((resolve, reject) => {
		uni.login({
			provider: 'weixin',
			success: (res) => {
				// console.log('登录请求结果==' + JSON.stringify(res));
				resolve(res);
			},
			fail: (e) => {
				console.log("登录请求错误==" + e);
				reject(e);
			}
		})
	})
}
//获取分享链接地址
function getshareUrl() {
	var phone = uni.getStorageSync('phone');
	var allstr = BASE_URL + 'reg/index.html' + '?tzb=' + phone;
	console.log('分享链接是' + allstr);
	return allstr;
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}
	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)
	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
// 判断是否为空
function judgeNull(value) {
	if (value == null || value == undefined) return true
	if (this.judgeString(value)) {
		if (value.trim().length == 0) return true
	} else if (this.judgeArray(value)) {
		if (value.length == 0) return true
	} else if (this.judgeObject(value)) {
		for (let name in value) return false
		return true
	}
	return false;
}

function judgeString(value) {
	return value != null && value != undefined && value.constructor == String
}

function judgeNumber(value) {
	return value != null && value != undefined && value.constructor == Number
}

function judgeBoolean(value) {
	return value != null && value != undefined && value.constructor == Boolean
}

function judgeArray(value) {
	return value != null && value != undefined && value.constructor == Array
}

function judgeObject(value) {
	return value != null && value != undefined && value.constructor == Object
}

function judgeFunction(value) {
	return value != null && value != undefined && value.constructor == Function
}
/**
 * 使用循环的方式判断一个元素是否存在于一个数组中
 * @param {Object} arr 数组
 * @param {Object} value 元素值
 */
function isInArray(arr, value) {
	for (var i = 0; i < arr.length; i++) {
		if (value == arr[i]) {
			return true;
		}
	}
	return false;
}
// 数组聚合
function chunk(arr, size) {
	var arr2 = [];
	for (var i = 0; i < arr.length; i = i + size) {
		var xiao = arr.slice(i, i + size)
		console.log("xiao==" + xiao)
		arr2.push(xiao);
	}
	return arr2;
}
// 处理时间戳
const formatTime = date => {
	var newdate = new Date(date)
	const year = newdate.getFullYear()
	const month = newdate.getMonth() + 1
	const day = newdate.getDate()
	const hour = newdate.getHours()
	const minute = newdate.getMinutes()
	const second = newdate.getSeconds()
	return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}
//获取当前时间
function getnowtime() {
	var newdate = new Date();
	var timestamp = Date.parse(new Date());
	var nowtimestr = this.formatTime(timestamp)
	return nowtimestr;
}
// function formatTime(time) {
//     if (typeof time !== 'number' || time < 0) {
//         return time
//     }
//     var hour = parseInt(time / 3600)
//     time = time % 3600
//     var minute = parseInt(time / 60)
//     time = time % 60
//     var second = time
//     return ([hour, minute, second]).map(function (n) {
//         n = n.toString()
//         return n[1] ? n : '0' + n
//     }).join(':')
// }
//toast  提示
function onetoast(str) {
	uni.showToast({
		title: str,
		icon: 'loading', //loading   none  success
		mask: false,
		duration: 1500
	});
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function(milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function(dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function(number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDay()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};


function toSkuArray (array, idArray) {
  const result = []
  const skuList = JSON.parse(array);
  const skuIdList = idArray;
  for (let i = 0; i < skuList.length; i++) {
    result.push({
      id: skuIdList[i],
      name: skuList[i],
      select: i === 0,
    })
  }
  return result;
}

function processSkuData (result) {
  let {  mpGoodsSkuList, mpGoods } = result;
  let newList =[];
  
  if(result.orderSku && result.orderSku.length>0){
		newList  = result.orderSku.map(item=>{
		if(item.sku && item.sku.length>0){
			item.sku = item.sku.map((itemq,index)=>{
				if(index==0){
					return Object.assign(itemq,{select:true}); 
				}else return Object.assign(itemq,{select:false}); 
			})
		}

		return item;
	});
	}
	//Fix
  
  
//   let list = []
// 
//   skuJson = JSON.parse(skuJson.replace(/\'/g, '"'));
//   skuIdJson = JSON.parse(skuIdJson.replace(/\'/g, '"'));
// 
//   const skuJsonKeys = Object.keys(skuJson);
//   const skuIdJsonKeys = Object.keys(skuIdJson);
// 
//   skuJsonKeys.forEach((key, index) => {
//     let idKey = skuIdJsonKeys[index];
//     list.push({
//       id: idKey,
//       name: key,
//       sku: toSkuArray(skuJson[key], skuIdJson[idKey], mpGoodsSkuList)
//     })
//   })
// 
  let map = {};
  mpGoodsSkuList.forEach(item => {
	  
    const key = Object.keys(item)[0];
    map[key] = item[key]
	
  })
  
  
  

  return {
    list:newList,
    dataMap: map,
    mpGoods,
  }
}

const SIGN_KEY = 'PresidentX';

function signApi (url, params) {
	// 加密 md5(参数+path+signKey)
	// 参数: 按key的字母升序排序，akey1bkey2ckey3=value1value2value3
	// path: 请求的路径
	// signKey：PresidentX
	let signKeys = [];
	let signValues = [];
	 const keys = Object.keys(params).sort();
	// const keys = Object.keys(params).sort((a, b) => a.localeCompare(b));
	// const keys = Object.keys(params).sort((a, b) => a<b);
	for (const key of keys) {
		let value = params[key];
		if (value !== undefined) {
			signKeys.push(key);
			signValues.push(value);
		}
	}
		const signParams = signKeys.join('') + '=' + signValues.join('');
		const path = url.replace(config.API_HOST, '');
		let str = encodeURIComponent(signParams + path + SIGN_KEY).replace(/%20/gi, '+').replace(/(!)|(')|(\()|(\))|(\~)/gi, item => {
		return '%' + item.charCodeAt(0).toString(16).toLocaleUpperCase();
	});

	
	const sign = md5(str);
	return sign;
}


/**
 * @param {Object} x
 * @param {Object} y
 * @param {Object} w
 * @param {Object} h
 * @param {Object} r
 * 这是一个canvas绘制圆角的方法
 */
function roundRect(x, y, w, h, r) {
	if (w < 2 * r) {r = w / 2;}
	if (h < 2 * r){ r = h / 2;}
	this.beginPath();
	this.moveTo(x+r, y);
	this.arcTo(x+w, y, x+w, y+h, r);
	this.arcTo(x+w, y+h, x, y+h, r);
	this.arcTo(x, y+h, x, y, r);
	this.arcTo(x, y, x+w, y, r);
	this.closePath();
	return this;
}

module.exports = {
	signApi,
	processSkuData,
	formatTime: formatTime,
	formatLocation: formatLocation,
	dateUtils: dateUtils,
	Promisenet: Promisenet,
	judgeNull: judgeNull,
	isInArray: isInArray,
	chunk: chunk,
	onetoast: onetoast,
	judgeArray: judgeArray,
	judgeString: judgeString,
	judgeObject: judgeObject,
	getnowtime: getnowtime,
	Uploadfile: Uploadfile,
	getCid: getCid,
	wechatlogin: wechatlogin,
	cidhandle: cidhandle,
	getshareUrl: getshareUrl, //获取分享链接地址 带上手机号 参数
	roundRect
}
// if (this.judgeString(value)) {
// 		if (value.trim().length == 0) return true
// 	} else if (this.judgeArray(value)) {
// 		if (value.length == 0) return true
// 	} else if (this.judgeObject(value)) {
// 		for (let name in value) return false
// 		return true
// 	}
