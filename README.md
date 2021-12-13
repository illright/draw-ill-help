# Draw, I'll Help

A progressive web application for drawing that automatically corrects hand-drawn circles and rectangles with the power of YOLOv5.

Check it out at <https://illright.github.io/draw-ill-help>.

## Highlights

* 🏎️ Completely serverless
* 🌐 Works offline
* 🧠 Runs YOLOv5 Nano in the background
* 🗃️ Built-in dataset generator
* 😎 Automatic dark mode
* 🍰 Follows the [feature-sliced methodology](https://feature-sliced.design/)

## Screenshots

<table>
<thead>
<th>Home page</th>
<th>Drawing canvas</th>
<th>Dataset generator</th>
</thead>
<tr>
<td>

![Home page](./.github/readme/home.jpg)

</td>
<td>

![Drawing page](./.github/readme/draw.jpg)

</td>
<td>

![Dataset page](./.github/readme/dataset.jpg)

</td>
</tr>
</table>

## Running locally

Grab the `model.zip` file from the latest release and unpack its contents into `static/`. Then run the usual commands:

```bash
pnpm i
pnpm dev
```

## License

The source code of this project is distributed under the terms of the MIT license. [Click here](https://choosealicense.com/licenses/mit/) to learn what that means.
