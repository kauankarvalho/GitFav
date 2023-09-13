import { Favorites } from "./favorites.js"

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)
  }

  createRow() {
    const tr = document.createElement("tr")
    tr.classList.add(
      "flex",
      "items-center",
      "gap-[4rem]",
      "border-b-[0.1rem]",
      "border-[#4A808C]",
      "px-[4rem]",
      "py-[1.6rem]",
      "text-left",
      "last:border-none",
      "odd:bg-[rgba(6,_22,_27,_0.5)]",
      "even:bg-[#06181C]",
    )
    return tr
  }

  update() {
    this.root.innerHTML = ""
    this.searchInput.value = ""

    if (this.entries.length >= 1) {
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
        <th 
          class="flex basis-3/5 items-center gap-[1.8rem] max-[700px]:basis-full"
        >
          <img 
            class="h-[5.6rem] w-[5.6rem] rounded-full" 
            src="${user.avatar_url}" 
            alt="Imagem de ${user.name}" 
          />
          <div class="flex flex-col">
            <span>${user.name}</span>
            <a
              class="max-w-min font-normal transition-all duration-[0.2s] hover:opacity-50"
              href="${user.html_url}"
              target="_blank"
            >
              ${user.login}
            </a>
          </div>
      </th>

      <th class="basis-1/4 max-[700px]:hidden">${user.public_repos}</th>
      <th class="basis-1/4 max-[950px]:hidden">${user.followers}</th>

      <th
        class="basis-1/6 text-[#F75A68] max-[950px]:basis-[11%] max-[700px]:min-w-[4.8rem] max-[700px]:basis-0"
      >
        <button
          id="remove-favorite-button"
          class="flex items-center transition-all duration-[0.2s] hover:opacity-50"
        >
          <span class="max-[985px]:hidden">Remover</span>
          
          <img
            class="hidden h-[2.5rem] w-[2.5rem] max-[985px]:block"
            src="./src/assets/icons/trash.svg"
            alt="Ícone de uma lixeira."
          />
        </button>
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
