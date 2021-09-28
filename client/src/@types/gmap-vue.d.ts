declare module 'gmap-vue' {
    import { PluginFunction } from "vue";
    export const install: PluginFunction<{}>;
    /// <reference types="@types/googlemaps" />
    
  class gmapApi extends Vue {}

  export { gmapApi };
  }