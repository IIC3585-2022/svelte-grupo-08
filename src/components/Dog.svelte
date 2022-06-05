<script>
  export let dog;
</script>

<div class="dog" style:background-image={`url(${dog.url})`}>
  <div class="body">
    <h1>{dog.name} {dog.age}</h1>
    <p>{dog.description}</p>
  </div>
</div>

<style>
  .dog {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 8px;
    height: 100%;
    width: 480px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    overflow: hidden;
  }
  .body {
    color: white;
    text-shadow: 2px 2px 8px black;
    box-sizing: border-box;
    width: 100%;
    padding: 1rem;
    position: absolute;
    bottom: 0;
    background-image: linear-gradient(to bottom, transparent, black);
  }
</style>
