/*
 * File: rtv.karma.test.js | Package: React Table View
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 14 Jul, 2018 | 02:48 AM
 * 
 * O P E N   S O U R C E   C O D E 
 * ---------------------------------
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

/* global before, after, it, describe, expect, dd */
import { objectsCssClasses } from '../../components/rtv/domHelpers';
import { data, simpleComponentBefore, simpleComponentDestroy, createMenu } from '../testObjects';
import testMenus from '../testMenus.json';
//import { Object } from 'glamorous';
//import { first } from '../../../../node_modules/glamor';

//const dd = console.log;
const nodeStyle = { height: '500px'};


describe( "Element Render", ()=>{

    before(simpleComponentBefore( nodeStyle, true, { menus:testMenus} ));
    after( simpleComponentDestroy );
    
    describe( "Basic Elements", ()=>{

        it("<TableView/> Should render", ()=>{
            expect( data.tableView() ).toHaveLength(1);
        });
    
        it("<TableViewHeader/> Should render", ()=>{
            expect( data.tableViewHeader() ).toHaveLength(1);
        });
    
        it("<TableViewContainer/> Should render", ()=>{
            expect( data.tableViewContainer() ).toHaveLength(1);
        });
    
        it("<TableViewFooter/> Should render", ()=>{
            expect( data.tableViewFooter() ).toHaveLength(1);
        });

    } );
    
    describe("Secondary Elements", ()=>{
        it("<TableViewMenu/> Should render", ()=>{
            expect( data.tableView().find("TableViewMenu") ).toHaveLength(1);
        });

        it("<TableViewCellWrapper/> Should render", ()=>{
            expect( data.tableView().find("TableViewCellWrapper") ).toHaveLength(9);
        });
    })

    describe( "Default Elements", ()=>{
        
        it("<DefaultTableViewHeader/> Should render", ()=>{
            expect( data.tableView().find("DefaultTableViewHeader") ).toHaveLength(1);
        });

        it("<DefaultTableViewFooter/> Should render", ()=>{
            expect( data.tableView().find("DefaultTableViewFooter") ).toHaveLength(1);
        });

        it("<DefaultTableViewSearchBox/> Should render", ()=>{
            expect( data.tableView().find("DefaultTableViewSearchBox") ).toHaveLength(1);
        });
        
    });

} );

describe( "Render with default values", ()=>{

    before(simpleComponentBefore( nodeStyle, true, { menus:testMenus} ));
    after( simpleComponentDestroy );

    describe("Header Behaviour", ()=>{
        it("BackButton should be disabled", ()=>{
            expect( data.defaultHeaderBtnAt(0).prop('disabled') ).toBeTruthy();
        });
    
        it("Search Button should open searchbox", ()=>{
            data.defaultHeaderBtnAt(1).simulate('click');
            expect( data.tableView().find('.'+objectsCssClasses.searchBox).hasClass("hidden") ).toBeFalsy();
        });

        it("Moving into menus should enable the back button", done=>{
            data.mounter.find("DefaultTableViewCell").at(1).simulate('click');
            setTimeout( ()=>{
                data.mounter.update();
                expect( data.defaultHeaderBtnAt(0).prop('disabled') ).toBeFalsy();
                expect( data.mounter.find("TableViewMenu").at(0).find("DefaultTableViewCell") ).toHaveLength(4);
                done();
            }, 50 )
            
        });

        it("Clicking on back button should return to the main menu", done =>{
            data.defaultHeaderBtnAt(0).simulate("click");
            setTimeout( ()=>{
                expect( data.mounter.find("TableViewMenu").at(1).find("DefaultTableViewCell") ).toHaveLength(9);  
                done();
            }, 50 )
        });

        it( "Home label should be HOME", ()=>{
            expect( data.defaultHeader().find("p").at(0).text() ).toEqual("Home");
        } )

        it( "Footer text should be FOOTER", ()=>{
            expect( data.defaultFooter().find("span").at(0).text() ).toEqual("FOOTER");
        } )


    });

    describe("SearchBox Behaviour", ()=>{
        
        it("Searchbox should be hidden", ()=>{
            data.defaultSearchBoxBtnAt(1).simulate('click');
            expect( data.tableView().find('.'+objectsCssClasses.searchBox).hasClass("hidden") ).toBeTruthy();
        });

        it("Close Search button should close the searchbox", ()=>{
            data.defaultHeaderBtnAt(1).simulate('click');
            data.defaultSearchBoxBtnAt(1).simulate('click');
            expect( data.tableView().find('.'+objectsCssClasses.searchBox).hasClass("hidden") ).toBeTruthy();
        });
    
        it("Input Search Clear Button should be invisible when Input is empty ", ()=>{
            data.defaultHeaderBtnAt(1).simulate('click');
            expect( data.defaultSearchBoxBtnAt(0).prop('visible') ).toBeFalsy()
        });
    
        it("Input Search Clear Button should be visible when Input is empty ", ()=>{
            const input = data.defaultSearchBox().find("input");
            input.simulate("change", { target: { value:"Da" } });
            expect( data.defaultSearchBoxBtnAt(0).prop('visible') ).toBeTruthy();
        });
    
        it("Input should be cleared when clear button is clicked", ()=>{
            data.defaultSearchBoxBtnAt(0).simulate("click");
            expect( data.defaultSearchBox().find("input").instance().value ).toEqual("");
        });

        it("Searchbox change should filter the results", () =>{   
            expect( data.mounter.find("TableViewMenu").at(1).find("DefaultTableViewCell") ).toHaveLength(9);
            data.defaultSearchBox().find("input").simulate("change", { target: { value:"Da" } });
            expect( data.mounter.find("TableViewMenu").at(1).find("DefaultTableViewCell") ).toHaveLength(2);
        })

        it("Searchbox clear should unfilter the results", ()=>{
            expect( data.mounter.find("TableViewMenu").at(1).find("DefaultTableViewCell") ).toHaveLength(2);
            data.defaultSearchBox().find("input").simulate("change", { target: { value:"" } });
            expect( data.mounter.find("TableViewMenu").at(1).find("DefaultTableViewCell") ).toHaveLength(9);
        });


    });

    describe("Menu Behaviour", ()=>{
        it("Cell should be selected on click");
        it("Going back to a menu should display previously selected cell");
        it("Keyb Movement should work to navigate");
        it("Optional Elements");
        it("Values passed by props");
    })

} );

describe("Keyboard Navigation", ()=>{

    before(simpleComponentBefore( nodeStyle, true, { menus:testMenus, homeLabel: "KEYB NAV"} ));
    after( simpleComponentDestroy );

    const { menuWrapper: wrapperCss } = objectsCssClasses;
    const resetMenu = indx =>{
        data.menuAt(indx).instance().unselectAll();
    }

    describe("When no cell is selected", ()=>{

        it("Tab selects first cell", ()=>{
            data.menuWrapperAt(0, wrapperCss ).simulate('keyDown',{ key: "Tab" });
            expect( data.cellAt(0).hasClass("focused") ).toBeTruthy(); 
            resetMenu(0);
        })

        it("ArrowDown selects first cell", ()=>{
            data.menuWrapperAt(0, wrapperCss ).simulate('keyDown',{ key: "ArrowDown" });
            expect( data.cellAt(0).hasClass("focused") ).toBeTruthy(); 
            resetMenu(0);
        });

        it("ArrowUp selects first cell", ()=>{
            data.menuWrapperAt(0, wrapperCss ).simulate('keyDown',{ key: "ArrowUp" });
            expect( data.cellAt(0).hasClass("focused") ).toBeTruthy(); 
            resetMenu(0);
        });

        it("ArrowRight should do nothing", ()=>{
            data.menuWrapperAt(0, wrapperCss ).simulate('keyDown',{ key: "ArrowRight" });
            expect( data.cellAt(0).hasClass("focused") ).toBeFalsy(); 
            expect( data.mounter.find("TableViewMenu") ).toHaveLength(1);
        });

        it("ArrowLeft should do nothing", ()=>{
            data.menuWrapperAt(0, wrapperCss ).simulate('keyDown',{ key: "ArrowLeft" });
            expect( data.cellAt(0).hasClass("focused") ).toBeFalsy(); 
            expect( data.mounter.find("TableViewMenu") ).toHaveLength(1);
        });

        it("Escape should unselect all cells", ()=>{
            data.menuWrapperAt(0, wrapperCss ).simulate('keyDown',{ key: "Escape" });
            expect( data.cellAt(0).hasClass("focused") ).toBeFalsy(); 
        } );

    });

    describe("When first cell is selected", ()=>{

        const selectFirstCell = () =>{
            resetMenu(0);
            data.menuWrapperAt(0, wrapperCss ).simulate('keyDown',{ key: "Tab" });
        }

        it("Tab selects second cell", ()=>{
            selectFirstCell();
            data.menuWrapperAt(0, wrapperCss ).simulate('keyDown',{ key: "Tab" });
            expect( data.cellAt(1).hasClass("focused") ).toBeTruthy(); 
        });

        it("ArrowDown selects second cell", ()=>{
            selectFirstCell();
            data.menuWrapperAt(0, wrapperCss ).simulate('keyDown',{ key: "Tab" });
            expect( data.cellAt(1).hasClass("focused") ).toBeTruthy(); 
        });

        it("ArrowUp opens up the search box", ()=>{
            selectFirstCell();
            data.menuWrapperAt(0, wrapperCss ).simulate('keyDown',{ key: "ArrowUp" });
            expect( data.tableView().find('.'+objectsCssClasses.searchBox).hasClass("hidden") ).toBeFalsy();
        });

    });

    describe("When last cell is selected", ()=>{
        const selectLastCell = () =>{
            const last = data.menuAt(0).find('TableViewCellWrapper').length - 1;
            resetMenu(0);
            data.cellAt( last ).simulate('focus');
        }

        it("ArrowUp should select cell before last",()=>{
            selectLastCell();
            const beforeLast = data.menuAt(0).find('TableViewCellWrapper').length - 2;
            data.menuWrapperAt(0, wrapperCss ).simulate('keyDown',{ key: "ArrowUp" });
            expect( data.cellAt(beforeLast).hasClass("focused") ).toBeTruthy(); 
        })

        it("ArrowDown should keep last cell selected",()=>{
            selectLastCell();
            const last = data.menuAt(0).find('TableViewCellWrapper').length - 1;
            data.menuWrapperAt(0, wrapperCss ).simulate('keyDown',{ key: "ArrowDown" });
            expect( data.cellAt(last).hasClass("focused") ).toBeTruthy(); 
        })
    })
});

describe("OptionalE Elements", ()=>{
    before(simpleComponentBefore( nodeStyle, false, { menus:testMenus, homeLabel: "Optionals", showHeader: false, showFooter: false } ));
    after( simpleComponentDestroy );

    it("Header should not be rendered", ()=>{
        expect( data.tableViewHeader() ).toHaveLength(0);
    });

    it("Footer should not be rendered", ()=>{
        expect( data.tableViewFooter() ).toHaveLength(0);
    });

    it("Default Click should be called", done=>{
        
        const ooClick  = ()=>{ return true }; 
        const defClick = sinon.spy(ooClick);

        data.mounter.setProps({ showHeader: true, showFooter: true, defaultClick: defClick });

        const cell = data.menuAt(0).find('TableViewCellWrapper').at(1).find('div').at(0);
        cell.simulate('click');
        
        const to = setTimeout( ()=>{
            expect( defClick.calledOnce ).toBeTruthy();
            clearTimeout(to);
            done();
        },10);
    });

});


describe( "Changing Props on the fly", ()=>{
    before(simpleComponentBefore( nodeStyle, false, { menus:testMenus } ));
    after( simpleComponentDestroy );

    it("Header Text should change from HOME to TESTING", ()=>{
        expect( data.defaultHeader().find("p").at(0).text() ).toEqual("Home");
        data.mounter.setProps({ homeLabel: "TESTING" });
        expect( data.defaultHeader().find("p").at(0).text() ).toEqual("TESTING");
    });

    it("Header should dissapear", ()=>{
        expect( data.tableViewHeader() ).toHaveLength(1);
        data.mounter.setProps({ showHeader: false });
        expect( data.tableViewHeader() ).toHaveLength(0);
    });

    it("Footer should dissapear", ()=>{
        expect( data.tableViewFooter() ).toHaveLength(1);
        data.mounter.setProps({ showFooter: false });
        expect( data.tableViewFooter() ).toHaveLength(0);
    });

    it("Header and Footer should be displayed back", ()=>{
        data.mounter.setProps({ showFooter: true, showHeader:true, homeLabel: "Home" });
        expect( data.tableViewHeader() ).toHaveLength(1);
        expect( data.tableViewFooter() ).toHaveLength(1);
    })

    it("Cells pointing to menus without cells should be disabled", ()=>{
        data.mounter.setProps({ disableEmpty: true });
        const cells = data.menuAt(0).find('DefaultTableViewCell');
        //expect( cells.at(0).prop('disabled') ).toBeTruthy();
        expect( cells.at(4).prop('disabled') ).toBeTruthy();
        expect( cells.at(7).prop('disabled') ).toBeTruthy();
        //expect( cells.at(8).prop('disabled') ).toBeTruthy();
    });

    it( "Cells pointing to menus without cells should be hidden", ()=>{
        data.mounter.setProps({ hideEmpty: true });
        expect( data.menuAt(0).find('DefaultTableViewCell') ).toHaveLength(7)
    } );

    it("Menu Should Change", ()=>{
        const defaultClick = ()=>{ return true; }
        const newMenus = [
            createMenu("Prueba 1", 10, 0),
            createMenu("Prueba 2", 60, 1),
            createMenu("Prueba 3", 0, 2),
            createMenu("Prueba 4", 4, 3),
        ]
        data.mounter.setProps({ showFooter: true, showHeader:true, disableEmpty: true, hideEmpty:false,homeLabel: "Home", menus: newMenus, defaultClick: defaultClick });
        expect( data.mounter.find("TableViewMenu").at(0).find("DefaultTableViewCell") ).toHaveLength(4);
        expect( data.tableViewHeader() ).toHaveLength(1);
        expect( data.menuAt(0).find('DefaultTableViewCell').at(2).prop('disabled') ).toBeTruthy();
    }),

    it("Should load cell info", ()=>{
        const defaultClick = (argx)=>{ console.log("ARGS", argx); return true }
        data.mounter.setProps({ defaultClick: defaultClick, disableEmpty: true});
    });
} )

describe.only( "Loading From URL", ()=>{
    
    const formatMenus = ( data ) => {
        return data.menus;
    }
    const defClick = ({ cellProps, downloadedData, gotoMenu, menuFinder, setLoadingFalse })=>{
        //const mf = dta => dta.label === "Financial";
        //const menu = menuFinder(mf);
        //console.log("AAALLL", menuFinder(mf));
        //gotoMenu( menu );
        console.log("DEF CLICK", cellProps);
        return true
    }

    const urlFormatter = cellProps => {
        const mod =  cellProps.code;
        return `https://localhost:6601/rtv/${mod}/menu`;
    };
    before(simpleComponentBefore( nodeStyle, false, { style:{ border:"none" },defaultClick:defClick, urlFormatter, formatMenus, menusUrl:'https://localhost:6601/testing/menus' } ));
    after( simpleComponentDestroy );
    it("Should Load the menus", ()=>{
        
    })
} )
