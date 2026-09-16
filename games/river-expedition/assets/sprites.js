// Original pixel sprites. One character = one pixel; periods are transparent.
// Asset data is embedded by the exporter. No image files are fetched at runtime.
export const PIXELS={
 palette:{a:'#172f36',b:'#8c503b',c:'#d59858',d:'#f6d88b',e:'#fff0bd',f:'#366a4b',g:'#59915a',h:'#85ae65',i:'#224d43',j:'#377d80',k:'#75bbbd',l:'#a4d7cf',m:'#62757a',n:'#9cac9a',o:'#da6948',p:'#e5ad45',q:'#394c58'},
 boat:[
 '.......aa.......','......abba......','.....abccba.....','.....acddca.....','....abcddcba....','....acddddca....','....aceeeeca....','....aceaaeca....','....acabba ca...'.replace(' ',''),'....acaddaca....','....acaaaaca....','....aceeeeca....','...bacddddcab...','..bbacddddcabb..','.cb.acddddca.bc.','cc..acddddca..cc','....acddddca....','....acddddca....','....acccccca....','.....abccba.....','.....abccba.....','......abba......','.......aa.......'],
 person:['.....aaaa.....','....adddda....','....adddda....','.....abba.....','....aooooa....','...aooooooa...','...accddcca...','...acddddca...','...acddddca...','....aaaaaa....','....aqqqqa....','....aq..qa....','....aa..aa....'],
 tree:['.......ii.......','......ifgi......','.....ifhhgi.....','....ifghhggi....','...ifghhhgggi...','..ifgghhhggggi..','...ifgghhgggi...','..ifgghhhggggi..','.ifgghhhhgggggi.','ifggghhhhggggggi','.ifggghhggggggi.','..ifgggggggggi..','...iiiggggiii...','......abba......','......abba......','......abba......'],
 pine:['.......ii.......','......iggi......','.....ighhgi.....','....igghhggi....','.....ighhgi.....','....igghhggi....','...iggghhgggi...','..igggghhggggi..','....igghhggi....','...iggghhgggi...','..igggghhggggi..','.iggggghhgggggi.','igggggghhggggggi','.....iabbi......','......abba......','......abba......'],
 rock:['.....aaaaaa.....','...aamnnnnmaa...','..amnnnnnnmmma..','.amnnnnnmmmmmma.','amnnnnmmmmmmmmma','amnnmmmmmmmmmmma','.ammmmmmmmmmmma.','..aaaaaaaaaaaa..'],
 log:['..aaaaaaaaaaaaaaaaaa..','.abccccccccccccccccba.','abccbbbbcbbbbbcbbbbccba','.abccccccccccccccccba.','..aaaaaaaaaaaaaaaaaa..'],
 reeds:['..h..h..h.','..g..h..g.','.hg.hgh.g.','..gggg.gg.','...ggggg..','....ggg...','.....i....'],
 crate:['aaaaaaaaaaaaaa','acccccccccccca','acaddddddddaca','acdaddddddadca','acddaddddaddca','acdddaddadddca','acddddaaddddca','acddddaaddddca','acdddaddadddca','acddaddddaddca','acdaddddddadca','acaddddddddaca','acccccccccccca','aaaaaaaaaaaaaa'],
 tent:['........aaa.........','.......apdpa........','......apdddpa.......','.....apddddppa......','....apddddppppa.....','...apddddppppppa....','..apddddppppppppa...','.apddddppppppppppa..','apddddppaaapppppppa.','apdddppaai aapp ppa.'.replaceAll(' ',''),'apddppaaaiiaapppppa.','apdppaaaiiiiaappppa.','aaaaaaaaaaaaaaaaaaaa'],
 bird:['........a.......','.......aee......','...aaaaeeea.....','..ae eeeea......'.replace(' ',''),'.aeeeeea........','..aaaaa.........','...b.b..........'],
 flag:['aeeeeeee','appppppa','apppppa.','apppppa.','appppppa','aaaaaaa.','a.......','a.......','a.......','a.......','a.......','a.......']
};

// Hand-authored branch silhouettes: tapered forks, broken ends, bark and highlights.
Object.assign(PIXELS,{
 log:['..............................','......bb......................','.......bc......b..............','........bc....bc..............','.........bc..bc...............','..bb......bcbc.........bb.....','...bcccccccbcccccccccccb......','..bcddddccccbbccccddddcccb....','...bbbbbbbccccccbbbbbbbb......','..........bbcbc...............','............bcbb..............','.............bc...............','..............b...............'],
 log2:['..............................','..................bb..........','......b..........bc...........','......bc........bc............','.......bc......bc.............','........bcc...bc..............','..bbccccccbccbcccccbb.........','...bcdddcccccccccdddccb.......','....bbbbccccbbbbbbbbb.........','.......bcbb...................','......bc......................','.....bb.......................'],
 log3:['..............................','....bb........................','.....bc..............b........','......bc............bc........','.......bc......bb..bc.........','...bbcccbcccccccbcbc..........','..bcdddccccccddccccccccbb.....','...bbbbbbbccccccccddccb.......','..........bcbbbbbbbbbb........','..........bc..................','...........bc.................','............bb................'],
 rock:['......aaaaa..........','....aamnnnnaa........','...amneennnnmaa......','..amnnnnnnnmmmmaa....','.amnnnnnmmqmmmmma....','amnnnnmmmqmmmmmmma...','amnnmmmmqqmmmmmmma...','.ammmmqqmmmmmmmqa....','..aammmmmmmmmqaa.....','....aaaaaaaaaa.......'],
 rock2:['.........aaa.........','.....aaaamnnaa.......','...aamnnneennmaa.....','..amneennnnmmmmma....','.amnnnnnnmmqmmmmaa...','amnnnnmmmqqmmmmmma...','.ammmmmmqqmmmmmmma...','..ammmmmmmmmmmmaa....','...aaaaaaaaaaaa......'],
 rock3:['.....aaaa............','...aamnnnaa..........','..amnneennma.........','.amnnnnnmmmmaa.......','amnnnmmmmqmmnnaa.....','ammmmmmmqmmnneema....','.ammmmqqmmnnmmmma....','..aammmmmmmmmmaa.....','....aaaaaaaaaaa......'],
 heart:['..aaa..aaa..','.aoooaaoooa.','aoeeoooooooa','aoeooooooopa','aooooooooppa','.aooooooppa.','..aooooppa..','...aooppa...','....appa....','.....aa.....'],
 shoal:['.....hhhhhhhh........','...hhhnnnnnnhhh......','..hhnnneennnnnhh.....','.hhnnneeeennnnnhh....','hhnnnneeeennnnnnhh...','.hhnnnnnnnnnnnhhh....','...hhhnnnnnhhhh......','.....hhhhhhh.........']
});
// Small, consistent highlights enrich the existing boat, foliage and cargo art.
for(const name of ['tree','pine','crate','boat','tent','person'])PIXELS[name]=PIXELS[name].map((row,y)=>[...row].map((c,x)=>c==='g'&&((x*3+y*7)%17===0)?'h':c==='c'&&((x+y*5)%19===0)?'d':c).join(''));

// Narrow canoe hull, seats and paddler; paddle is attached and animated by renderer.
PIXELS.boat=['........a........','.......aba.......','......abcba......','.....abc dcba....'.replace(' ',''),'.....acdddca.....','....abcddd cba...'.replace(' ',''),'....acdddd dca...'.replace(' ',''),'....acdddd dca...'.replace(' ',''),'....acbbbbbca....','....acdddd dca...'.replace(' ',''),'....acdddddca....','....acdaaadca....','....acad d aca...'.replaceAll(' ',''),'....acad d aca...'.replaceAll(' ',''),'....acbooo bca...'.replace(' ',''),'....acbooo bca...'.replace(' ',''),'....acbbbbbca....','....acdddddca....','....acdddddca....','....acbbbbbca....','....acdddddca....','.....acdddca.....','.....acccc ca....'.replace(' ',''),'......abcba......','.......aba.......','........a........'];
