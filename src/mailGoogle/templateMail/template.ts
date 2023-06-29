export async function template_1(value: string) {
  return `
  <div style="text-align: center;">
    <h1 style="background-color: rgb(220, 220, 220); color: rgb(0, 0, 0);">Gmail được gửi tự động</h1>
    <p>${value}</p>
    <img src="https://cms-wp.bigcommerce.com/wp-content/uploads/2018/10/email-automation.jpg" alt="background mail auto"
        width="350px" style="border-radius: 15px;">
  </div>`
}