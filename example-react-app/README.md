# Headless Tridion Sites React Example App

This React application demonstrates how to use the `headless-xpm-react` package to make components editable in RWS Tridion Experience Space.


##  Prerequisites

- Node.js - Latest
- Tridion Sites 10 - Don't have <a href="https://www.rws.com/content-management/tridion/sites/">Tridion Sites</a> installed, Reach out to <a href="https://rws.com" title="rws" target="_blank">RWS</a> Sales

---

## Configure the Example App

- Navigate to the root directory of the React app and open it in your preferred editor.

- Configure Environment Variables

    Edit the `.env` file in the root and set the following variables:

    Tridion Experience Space editor URL

    ```env
    VITE_EXP_SPACE_EDITOR_URL=https://sites.tridiondemo.com/ui/editor
    ```

    Tridion GraphQL Endpoint

    ```env
    VITE_TRIDION_SITES_GRAPHQL_URL=https://sites.tridiondemo.com:8081/cd/api
    ```

    Tridion Publication and Component IDs

    ```env
    VITE_TRIDION_SITES_PUBLICATION_ID=5

    VITE_TRIDION_SITES_COMPONENT_ID=283
    ```
---

## Installation

### Install Dependencies
        
    npm install

### Run the App

    npm run dev
		
Visit to http://localhost:4200		
		
---		
		
	

	
## headless-xpm-react package usage	
 
`App.tsx`

```tsx

    import axios from "axios"
    import {  HeadlessXpmProvider } from "headless-xpm-react";

    import { TYPED_COMPONENT_QUERY_VARIABLES } from "./typedComponentQueryVariables"
    import { TYPED_COMPONENT_QUERY } from "./typedCompnentQuery";
    import { useEffect, useState } from "react"
    import type { IComponentProps } from "./types";

    import CardComponent from "./components/CardComponent";

    const App = () => {
        const [componentData, setCompnentData] = useState<IComponentProps | null>(null)
        useEffect(() => {
            getComponentData()
        }, [])

        const getComponentData = async () => {
            const typedComponentQuery = {
                query: TYPED_COMPONENT_QUERY,
                variables: TYPED_COMPONENT_QUERY_VARIABLES
            }
            const response = await axios.post(import.meta.env.VITE_TRIDION_SITES_GRAPHQL_URL, typedComponentQuery)
            if(response.data.data.typedComponent!==null){
                setCompnentData(response.data.data.typedComponent)
            }
        }

        return (
            <HeadlessXpmProvider editorUrl={import.meta.env.VITE_EXP_SPACE_EDITOR_URL} showExpSpaceEditor={true} showPageEditorLink={true}>
                <div className="flex items-center justify-center h-screen w-lg m-auto">
                    <CardComponent componentData={componentData as IComponentProps} />
                </div>
            </HeadlessXpmProvider>
        )
    }

    export default App
```

### `<HeadlessXpmProvider />` Props


| Prop                 | Type                  | Description                     | Required?               |
| -------------------- | --------------------- | ------------------------------- | ----------------------- |
| `editorUrl`          | `string`              | URL to open in Experience Space | ✅ Yes                   |
| `children`           | `React.ReactNode`     | Children to wrap                | ✅ Yes                   |
| `linkStyle`          | `React.CSSProperties` | Custom style for the link icon  | ❌ No                    |
| `iconStyle`          | `React.CSSProperties` | Style for the icon              | ❌ No                    |
| `containerStyle`     | `React.CSSProperties` | Wrapper div style               | ❌ No                    |
| `contentStyle`       | `React.CSSProperties` | Content wrapper style           | ❌ No                    |
| `icon`               | `React.ReactNode`     | Custom SVG/icon                 | ❌ No                    |
| `showExpSpaceEditor` | `boolean`             | Show bottom toolbar             | ❌ No (default: `true`)  |
| `showPageEditorLink` | `boolean`             | Show page edit button           | ❌ No (default: `false`) |

---

`CardComponent.tsx`

```jsx
    import { HeadlessXpmEditor } from "headless-xpm-react"

    const CardComponent = ({ componentData }: CardComponentProps) => {
        return (
            <HeadlessXpmEditor 
                tcmId={`tcm:${componentData?.publicationId}-${componentData?.itemId}`}>
                <Card className="w-full h-auto hover:border-[#007373] shadow-lg">
                    <CardHeader>
                        <CardTitle className="mt-2">{componentData?.headline}</CardTitle>
                        <CardDescription>{componentData?.articleBody[0]?.subheading}</CardDescription>
                    </CardHeader>
                    <CardContent dangerouslySetInnerHTML={{ __html: componentData?.articleBody[0]?.content?.html as string }} />
                </Card>
            </HeadlessXpmEditor>
        )
    }

```

### `<HeadlessXpmEditor />` Props

| Prop       | Type              | Description                         | Required?               |
| ---------- | ----------------- | ----------------------------------- | ----------------------- |
| `tcmId`    | `string`          | TCM URI of the component or page    | ✅ Yes                   |
| `children` | `React.ReactNode` | Editable content                    | ✅ Yes                   |
| `isPage`   | `boolean`         | Whether this is a Page or Component | ❌ No (default: `false`) |



## Exmaple React App

- Navigate to Example folder 