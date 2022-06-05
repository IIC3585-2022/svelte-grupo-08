<main>
<Navbar/>
<div id="content">
  <Router {routes}/>
</div>
</main>

<script>
  import Router from 'svelte-spa-router';
  import Navbar from './components/Navbar.svelte';
  import DogViewer from './components/DogViewer.svelte';
  import Profile from './components/Profile.svelte';
  import Matches from './components/Matches.svelte';
  import Match from './components/Match.svelte';

  const routes = {
    '/': DogViewer,
    '/profile': Profile,
    '/matches': Matches,
    '/match/:idx': Match,
  }
</script>

<style>
  main {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100vh;
    width: 100vw;
    background-color: #f0f2f4;
    overflow: auto;
  }
  #content {
    padding: 80px 10px 20px 10px;
  }
</style>
