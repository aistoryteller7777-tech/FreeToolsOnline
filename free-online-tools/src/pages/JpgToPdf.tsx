import React, { useState } from "react";
import { jsPDF } from "jspdf";

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";


interface ImageItem {
  id: string;
  file: File;
  preview: string;
}


const SortableImage = ({
  item,
  removeImage,
}: {
  item: ImageItem;
  removeImage: (id:string)=>void;
}) => {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id:item.id,
  });


  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };


  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="pdf-image-card"
    >

      <img
        src={item.preview}
        className="pdf-thumb"
      />

      <button
        className="remove-image-btn"
        onClick={(e)=>{
          e.stopPropagation();
          removeImage(item.id);
        }}
      >
        ❌
      </button>

    </div>
  );
};



const JpgToPdf: React.FC = () => {


document.title =
"JPG To PDF Online Free - Online Toolbox";


const [images,setImages] =
useState<ImageItem[]>([]);


const [fileName,setFileName] =
useState("");


const [pageSize,setPageSize] =
useState("A4");


const [orientation,setOrientation] =
useState("portrait");


const [targetSize,setTargetSize] =
useState("No Limit");


const [loading,setLoading] =
useState(false);



const handleUpload = (
e:React.ChangeEvent<HTMLInputElement>
)=>{

const files =
e.target.files;


if(!files) return;


const newImages =
Array.from(files).map((file)=>({

id:
Date.now().toString(),

file,

preview:
URL.createObjectURL(file),

}));


setImages(prev=>[
...prev,
...newImages
]);


};
  const removeImage = (id:string)=>{

  setImages(prev =>
    prev.filter(image => image.id !== id)
  );

};



const handleDragEnd = (event:any)=>{

  const {
    active,
    over
  } = event;


  if(
    !over ||
    active.id === over.id
  ) return;


  setImages((items)=>{

    const oldIndex =
    items.findIndex(
      item=>item.id===active.id
    );


    const newIndex =
    items.findIndex(
      item=>item.id===over.id
    );


    return arrayMove(
      items,
      oldIndex,
      newIndex
    );

  });

};



const getPdfSize = ()=>{

  if(pageSize==="A4"){
    return {
      width:210,
      height:297
    };
  }


  if(pageSize==="Letter"){
    return {
      width:216,
      height:279
    };
  }


  return {
    width:210,
    height:297
  };

};





const convertToPdf = async()=>{


if(images.length===0){

alert(
"Please upload images"
);

return;

}


setLoading(true);


try{


const size =
getPdfSize();



const pdf =
new jsPDF({

orientation:
orientation==="landscape"
? "landscape"
: "portrait",

unit:"mm",

format:
pageSize==="Letter"
? "letter"
: "a4"

});



for(
let i=0;
i<images.length;
i++
){


const imageData =
await new Promise<string>(
(resolve)=>{

const reader =
new FileReader();


reader.onload=()=>{

resolve(
reader.result as string
);

};


reader.readAsDataURL(
images[i].file
);


});



if(i>0){

pdf.addPage();

}



pdf.addImage(

imageData,

"JPEG",

10,

10,

size.width-20,

size.height-20

);


}



const finalName =
fileName.trim() !== ""
?
fileName.trim()
:
"converted-images";



pdf.save(
`${finalName}.pdf`
);



}
catch(error){

console.error(error);

alert(
"PDF creation failed"
);


}
finally{

setLoading(false);

}


};
  return (

<div className="tool-page">


<div className="tool-header">

<h1>📄 JPG To PDF</h1>

<p>
Convert multiple images into a professional PDF file.
</p>

</div>



<div className="tool-card">


<input
type="file"
accept="image/*"
multiple
onChange={handleUpload}
/>




{images.length > 0 && (

<div className="pdf-images-area">


<h3>
Selected Images ({images.length})
</h3>



<DndContext
collisionDetection={closestCenter}
onDragEnd={handleDragEnd}
>


<SortableContext
items={images.map(img=>img.id)}
strategy={horizontalListSortingStrategy}
>


<div className="pdf-image-list">


{
images.map((item)=>(

<SortableImage

key={item.id}

item={item}

removeImage={removeImage}

/>

))
}



</div>


</SortableContext>


</DndContext>


<p>
Drag images to change order
</p>


</div>

)}




<div className="pdf-settings">


<h3>
PDF Settings
</h3>



<label>
Page Size
</label>


<select

value={pageSize}

onChange={
e=>setPageSize(e.target.value)
}

>

<option value="A4">
A4
</option>

<option value="Letter">
Letter
</option>

<option value="Original">
Original
</option>


</select>





<label>
Orientation
</label>


<select

value={orientation}

onChange={
e=>setOrientation(e.target.value)
}

>

<option value="portrait">
Portrait
</option>


<option value="landscape">
Landscape
</option>


</select>





<label>
Target PDF Size
</label>


<select

value={targetSize}

onChange={
e=>setTargetSize(e.target.value)
}

>

<option>
No Limit
</option>

<option>
200 KB
</option>


<option>
500 KB
</option>


<option>
1 MB
</option>


<option>
2 MB
</option>


<option>
5 MB
</option>


</select>






<label>
PDF File Name (Optional)
</label>


<input

type="text"

placeholder="converted-images"

value={fileName}

onChange={
e=>setFileName(e.target.value)
}

/>



<button

className="action-btn"

onClick={convertToPdf}

disabled={loading}

>


{
loading
?
"Creating PDF..."
:
"Convert To PDF"
}


</button>



</div>



</div>



<div className="seo-content">


<h2>
JPG To PDF Online Free
</h2>


<p>
Convert JPG images into PDF files online.
Arrange images, remove unwanted photos,
select page settings and create PDF easily.
</p>


<h3>
Features
</h3>


<ul>

<li>
Multiple image upload
</li>

<li>
Drag and reorder images
</li>

<li>
Remove unwanted images
</li>

<li>
Custom PDF name
</li>

<li>
A4 and Letter support
</li>

</ul>


</div>



</div>

);


};


export default JpgToPdf;
