import { toggleButtonAttributesAndClass } from "../utils.js"
import { GithubUserAPI } from "./githubUserAPI.js"

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)

    this.input = document.querySelector("#search")
    this.button = document.querySelector("#add-favorite")
    this.pageNoFavorites = document.querySelector("#page-no-favorites")

    this.load()
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem("@github-favorites:")) || []
    this.button.addEventListener("click", () => {
      this.add(this.input.value)
    })
    this.update()
  }

  save() {
    localStorage.setItem("@github-favorites:", JSON.stringify(this.entries))
  }

  async add(username) {
    try {
      const userExists = this.entries.find((user) => user.login === username)
      if (username === "") {
        throw new Error("🟥 Digite um usuário!")
      } else if (userExists) {
        throw new Error("🟨 Usuário já adicionado!")
      }

      toggleButtonAttributesAndClass(this.button)

      const user = await GithubUserAPI.search(username)
      if (user.login === undefined) {
        toggleButtonAttributesAndClass(this.button)
        throw new Error("🟥 Usuário não encontrado!")
      }

      toggleButtonAttributesAndClass(this.button)

      this.entries = [user, ...this.entries]

      this.update()
      this.save()
    } catch (error) {
      alert(error.message)
      this.input.value = ""
    }
  }

  remove(username) {
    const isOk = confirm("🟨 Deseja remover este usuário dos favoritos?")
    if (isOk) {
      this.entries = this.entries.filter((user) => user.login !== username)
      this.update()
      this.save()
    }
  }
}
