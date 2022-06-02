<script>
  import { onMount } from "svelte";

  let url = ''
  let bookmarks = [];

  onMount(async () => {
    const res = await fetch('http://localhost:3001/api/bookmarks')
    bookmarks = await res.json()
  })

  async function handleAddClick() {
    if (url === '') return;

    const res = await fetch('http://localhost:3001/api/bookmarks/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    })

    url = '';
    const bookmark = await res.json();
    bookmarks = [...bookmarks, bookmark]
  }

  async function deleteBookmark(id) {
    const res = await fetch('http://localhost:3001/api/bookmarks/' + id, {
      method: 'DELETE',
    })

    const succeeded = await res.json()

    if (succeeded) {
      bookmarks = bookmarks.filter((bookmark) => bookmark.id !== id)
    }
  }

  async function likeBookmark(id) {
    const { liked } = bookmarks.find((bookmark) => bookmark.id === id)
    bookmarks = bookmarks.map((bookmark) => {
      if (bookmark.id === id) {
        bookmark.liked = !liked
      }

      return bookmark
    })

    const res = await fetch('http://localhost:3001/api/bookmarks/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ like: !liked })
    })

    const succeeded = await res.json()

    if (!succeeded) {
      bookmarks = bookmarks.map((bookmark) => {
        if (bookmark.id === id) {
          bookmark.liked = liked
        }

        return bookmark
      })
    }
  }
</script>

<div class="add-link-form">
  <input bind:value={url} type="text">
  <button on:click={handleAddClick} class="add-btn">Add</button>
</div>

<ul>
  {#each bookmarks as {title, description, image, url, liked, id}}
    <li>
      <div class="header">
        <img src={image} alt={title}>
        <div class="actions">
          <button on:click={() => likeBookmark(id)} class:liked="{liked === true}">❤️</button>
          <button on:click={() => deleteBookmark(id)}>🗑️</button>
        </div>
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
  img {
    max-width: 20rem;
    height: 15rem;
    object-fit: contain;
  }

  .header {
    position: relative;
  }

  .actions {
    position: absolute;
    inset: 0;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    opacity: 0;
    transition: opacity 200ms;
  }

  .actions:hover {
    opacity: 1;
  }

  .actions button {
    font-size: 30px;
    cursor: pointer;
    display: block;
    padding: .6em;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    border: none;
  }

  button.liked {
    background-color: rgb(255, 84, 84);
  }

  ul {
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  li {
    max-width: 20rem;
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