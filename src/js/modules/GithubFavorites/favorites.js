import { GithubUserAPI } from "./githubUserAPI.js"

class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.entries = []
  }

  async add(username) {
    try {
      const user = await GithubUserAPI.search(username)

      if (user.login === undefined) {
        throw new Error("🟥 Usuário não encontrado!")
      } else if (this.entries.some((entry) => entry.login === user.login)) {
        throw new Error("🟨 Usuário já adicionado!")
      }

      this.entries = [user, ...this.entries]
      this.update()
    } catch (error) {
      alert(error.message)
    }
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.input = document.querySelector("#search")
    this.button = document.querySelector("#add-favorite")

    this.event()
  }

  event() {
    this.button.addEventListener("click", () => {
      this.add(this.input.value)
    })
  }

  createRow() {
    const tr = document.createElement("tr")
    tr.classList.add(
      "flex",
      "items-center",
      "gap-[4rem]",
      "px-[4rem]",
      "py-[1.6rem]",
      "text-left",
      "last:rounded-b-[1.2rem]",
      "odd:bg-[rgba(6,_22,_27,_0.5)]",
      "even:bg-[#06181C]",
    )
    return tr
  }

  update() {
    this.root.innerHTML = ""
    this.input.value = ""

    if (this.entries.length === 1) {
      const noFavorites = document.querySelector("#no-favorites")
      noFavorites.classList.add("hidden")
    }

    this.entries.forEach((user) => {
      const tr = this.createRow()
      tr.innerHTML = `
        <th class="flex basis-3/4 items-center gap-[1.8rem]">
          <img
            class="h-[5.6rem] w-[5.6rem] rounded-full"
            src="${user.avatar_url}"
            alt="Imagem de ${user.name}"
          />
          <div class="flex flex-col">
            <span>${user.name}</span>
            <a
              class="font-normal"
              href="${user.html_url}"
              target="_blank"
            >
              ${user.login}
            </a>
          </div>
        </th>

        <th class="basis-1/4">${user.public_repos}</th>
        <th class="basis-1/4">${user.followers}</th>

        <th
          class="basis-1/6 text-[#F75A68]"
        >
          <button id="remove-favorite">Remover</button>
        </th>
      `
      this.root.append(tr)
    })
  }
}
