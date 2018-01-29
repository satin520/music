<template>
  <div id="app">
  	<headers></headers>
    <home></home>
  </div>
</template>

<script>
import headers from './components/header/headers'
import home from './components/home'
export default {
  name: 'app',
   components: {
   	 headers,
   	 home
   }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}
</style>
