import { Favorites } from "./favorites.js"

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.input = document.querySelector("#search")
    this.button = document.querySelector("#add-favorite")
    this.pageNoFavorites = document.querySelector("#page-no-favorites")

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
      this.pageNoFavorites.classList.add("hidden")
    } else if (this.entries.length === 0) {
      this.pageNoFavorites.classList.remove("hidden")
    }

    this.entries.forEach((user) => {
      const tr = this.createRow()

      if (user.name === null) {
        user.name = "Usuário sem nome"
      }

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
          <button id="remove-favorite-button">Remover</button>
        </th>
      `

      this.root.append(tr)

      const removeFavoriteButton = tr.querySelector("#remove-favorite-button")
      removeFavoriteButton.addEventListener("click", () => {
        this.remove(user.login)
      })
    })
  }
}
