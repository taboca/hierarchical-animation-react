## Readme

This experiment was made to support the development effort and design of an animation and DOM manipulation solution. The main goals are: 

* To have a data structure, in this case the JSON object, which refers to a specification for animation rules;
* To support hiearchies, i.e. to allow animation to happen after other animation; therefore to be able to chain animation;
* To offer some level of composition support, which is to allow an animation of a child to be performed with the realm of the parent animation, therefore in this case ensuring that you have both animation to complete all together but one to have access to the scope of its inner element. 

## Test

```sh
npm install
node index.js
```

And visit <http://localhost:3000/>.

## Example of animation tree

```
 var globalData = {"root":
     {
       "content":"This is just a content....",
       "ref":"element reference",
       "animation":"typing",
       "childs":[
         {
           "content":"## This is just a content....",
           "ref":"element reference",
           "animation":"typing",
           "childs":null
         },
         {
           "content":"## This is just a content....",
           "ref":"element reference",
           "animation":"static",
           "childs":null
         }
       ]
     }
 }


```
## Author

This is an experiment and learning initiative. Please contribute to the discussion. 
