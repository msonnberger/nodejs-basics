<script>
  let url = ''
  let previews = [
    {
       "title":"Google",
       "description":"Search webpages, images, videos and more.",
       "image":"https://www.google.com/images/logo.png",
       "url":"https://www.google.com",
       "id": "4579271b-a982-41b6-8b17-51707068a6c0"
    },
    {
       "title":"Google",
       "description":"Search webpages, images, videos and more.",
       "image":"https://www.google.com/images/logo.png",
       "url":"https://www.google.com",
       "id": "72bd04e4-6cb3-47a1-bdb6-1d9561a546ba"
    },
    {
       "title":"Google",
       "description":"Search webpages, images, videos and more.",
       "image":"https://www.google.com/images/logo.png",
       "url":"https://www.google.com",
       "id": "50461dc1-9b99-40e0-b32d-9afdffda644e"
    }
  ]
</script>

<div class="add-link-form">
  <input bind:value={url} type="text">
  <button class="add-btn">Add</button>
</div>

<ul>
  {#each previews as {title, description, image, url, id}}
    <li>
      <div>
        <img src={image} alt={title}>
        <button>Like</button>
        <button>Delete</button>
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
      <a href={url}>{url}</a>
    </li>
  {/each}
</ul>

<svelte:head>
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  </style>
</svelte:head>

<style>
  ul {
    list-style-type: none;
    display: flex;
    gap: 1rem;
  }

  li {
    box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
    border-radius: 5px;
    padding: 1rem;
  }

  input {
    font-size: 2rem;
    border: 2px solid black;
  }

  .add-link-form {
    display: flex;
    gap: .3rem;
    justify-content: center;
    margin-top: 100px;
  }

  .add-btn {
    border: 2px solid black;
    padding: 0 1rem;
    font-size: 1.4rem;
  }
</style>